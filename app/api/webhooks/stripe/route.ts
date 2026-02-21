import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { connectDB } from '@/lib/db';
import { Order } from '@/lib/models/Order';
import { Product } from '@/lib/models/Product';
import { Notification } from '@/lib/models/Notification';
import { Analytics } from '@/lib/models/Analytics';
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

        await connectDB();

        // Idempotency check
        const existingOrder = await Order.findOne({
          stripePaymentIntentId: session.payment_intent as string,
        }).lean();

        if (existingOrder) {
          console.log('Order already exists:', (existingOrder as any)._id);
          break;
        }

        const productIdsString = session.metadata?.productIds;
        if (!productIdsString) { console.error('No product IDs in session metadata'); break; }

        const productIds: string[] = JSON.parse(productIdsString);
        const userId = session.metadata?.userId;
        if (!userId) { console.error('No user ID in session metadata'); break; }

        const products = await Product.find({ _id: { $in: productIds } }).lean();
        const licenseTierId = session.metadata?.licenseTierId || undefined;

        // Buyer notification
        await Notification.create({
          userId,
          title: 'Order Confirmed!',
          message: `Your purchase of ${products.length} item(s) was successful.`,
          type: 'PURCHASE',
          link: '/dashboard',
        });

        // Seller analytics + notifications
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const sellerIds = [...new Set(products.map((p) => p.userId))];

        for (const sellerId of sellerIds) {
          const sellerProducts = products.filter((p) => p.userId === sellerId);
          const sellerRevenue = sellerProducts.reduce((acc, p) => acc + p.price, 0);

          await Notification.create({
            userId: sellerId,
            title: 'Cha-ching! New Sale',
            message: 'You just sold digital assets. Check your dashboard.',
            type: 'SALE',
            link: '/dashboard',
          });

          // Upsert analytics record
          await Analytics.findOneAndUpdate(
            { date: today, userId: sellerId },
            { $inc: { revenue: sellerRevenue, sales: sellerProducts.length } },
            { upsert: true, new: true }
          );
        }

        // Create the order
        const order = await Order.create({
          userId,
          pricePaidInCents: session.amount_total || 0,
          stripePaymentIntentId: session.payment_intent as string,
          isPaid: true,
          items: products.map((product) => ({
            productId: product._id.toString(),
            quantity: 1,
            price: product.price,
            licenseTierId,
          })),
        });

        // Decrement stock
        for (const product of products) {
          await Product.findByIdAndUpdate(product._id, {
            $inc: { stock: -1 },
          });
        }

        console.log('Order created:', order._id);
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
