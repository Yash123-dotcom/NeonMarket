import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/lib/models/User';
import { Product } from '@/lib/models/Product';
import { Order } from '@/lib/models/Order';
import { Review } from '@/lib/models/Review';

export async function GET() {
  try {
    await connectDB();

    const [userCount, productCount, orderCount, reviewCount] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Review.countDocuments(),
    ]);

    const sampleProducts = await Product.find().limit(3).select('_id name price isActive').lean();

    return NextResponse.json({
      status: 'Website is running successfully! 🎉',
      database: { connected: true, type: 'MongoDB', users: userCount, products: productCount, orders: orderCount, reviews: reviewCount },
      sampleProducts: sampleProducts.map((p) => ({ ...p, id: p._id.toString() })),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'Error occurred', error: error instanceof Error ? error.message : 'Unknown error', timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
