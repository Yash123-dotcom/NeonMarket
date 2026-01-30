import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/db';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature');

  if (!signature) {
    return new NextResponse('No signature', { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return new NextResponse('Invalid signature', { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        // Prevent duplicate orders
        const existingOrder = await prisma.order.findUnique({
          where: { stripePaymentIntentId: session.payment_intent as string },
        });

        if (existingOrder) {
          console.log('Order already exists:', existingOrder.id);
          break;
        }

        // Get product IDs from metadata
        const productIdsString = session.metadata?.productIds;
        if (!productIdsString) {
          console.error('No product IDs in session metadata');
          break;
        }

        const productIds = JSON.parse(productIdsString);
        const userId = session.metadata?.userId;

        if (!userId) {
          console.error('No user ID in session metadata');
          break;
        }

        // Get products to update stock
        const products = await prisma.product.findMany({
          where: { id: { in: productIds } },
        });

        // ---------------------------------------------------------
        // ATOMIC TRANSACTION START
        // ---------------------------------------------------------
        await prisma.$transaction(async (tx: any) => {
          // 1. Create "Purchase Successful" Notification for Buyer
          await tx.notification.create({
            data: {
              userId,
              title: "Order Confirmed!",
              message: `Your purchase of ${products.length} items was successful.`,
              type: "PURCHASE",
              link: "/dashboard",
            },
          });

          // 2. Process improvements for Sellers: Analytics & Notifications
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const licenseTierId = session.metadata?.licenseTierId;

          const sellerIds = Array.from(new Set(products.map((p) => p.userId)));
          
          for (const sellerId of sellerIds) {
             const sellerProducts = products.filter(p => p.userId === sellerId);
             const sellerRevenue = sellerProducts.reduce((acc, p) => acc + p.price, 0); 

            // Notify Seller
            await tx.notification.create({
              data: {
                userId: sellerId,
                title: "Cha-ching! New Sale",
                message: "You just sold digital assets. Check your dashboard.",
                type: "SALE",
                link: "/dashboard",
              },
            });

            // Update Analytics (Upsert Daily Record)
            await tx.analytics.upsert({
                where: {
                    date_userId: {
                        date: today,
                        userId: sellerId
                    }
                },
                update: {
                    revenue: { increment: sellerRevenue },
                    sales: { increment: sellerProducts.length }
                },
                create: {
                    date: today,
                    userId: sellerId,
                    revenue: sellerRevenue,
                    sales: sellerProducts.length
                }
            });
          }

           // 3. Create the order
          const order = await tx.order.create({
            data: {
              userId,
              pricePaidInCents: session.amount_total || 0,
              stripePaymentIntentId: session.payment_intent as string,
              isPaid: true,
              items: {
                create: products.map((product) => ({
                  productId: product.id,
                  quantity: 1,
                  price: product.price, 
                  licenseTierId: licenseTierId || undefined,
                })),
              },
            },
          });

          // 4. Update stock for each product
          for (const product of products) {
            await tx.product.update({
              where: { id: product.id },
              data: { stock: Math.max(0, product.stock - 1) },
            });
          }

          console.log('Order created successfully:', order.id);
        });
        // ---------------------------------------------------------
        // ATOMIC TRANSACTION END
        // ---------------------------------------------------------

        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', paymentIntent.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new NextResponse('Webhook processed', { status: 200 });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return new NextResponse('Webhook processing failed', { status: 500 });
  }
}
