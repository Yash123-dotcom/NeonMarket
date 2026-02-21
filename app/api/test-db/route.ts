import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/lib/models/User';
import { Product } from '@/lib/models/Product';

export async function GET() {
  try {
    await connectDB();
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    return NextResponse.json({
      status: 'MongoDB connected ✅',
      users: userCount,
      products: productCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'DB connection failed ❌', error: String(error) },
      { status: 500 }
    );
  }
}
