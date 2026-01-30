import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Get counts from database
    const [userCount, productCount, orderCount, reviewCount] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.review.count(),
    ]);

    // Get sample products
    const sampleProducts = await prisma.product.findMany({
      take: 3,
      select: {
        id: true,
        name: true,
        price: true,
        isActive: true,
      },
    });

    return NextResponse.json({
      status: 'Website is running successfully! 🎉',
      database: {
        connected: true,
        users: userCount,
        products: productCount,
        orders: orderCount,
        reviews: reviewCount,
      },
      sampleProducts,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'Error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
