import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Order } from '@/lib/models/Order';
import { Product } from '@/lib/models/Product';
import { auth } from '@clerk/nextjs/server';
import { rateLimit, getClientIP } from '@/lib/rate-limit';
import fs from 'fs';
import path from 'path';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const clientIP = getClientIP(req);
  const rateLimitResult = rateLimit(`download:${clientIP}`, 5, 60000);

  if (!rateLimitResult.success) {
    return new NextResponse('Rate limit exceeded. Please try again later.', {
      status: 429,
      headers: {
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
      },
    });
  }

  const { userId } = await auth();
  const { productId } = await params;

  if (!userId) return new NextResponse('Unauthorized', { status: 401 });

  await connectDB();

  const purchase = await Order.findOne({
    userId,
    isPaid: true,
    'items.productId': productId,
  }).lean();

  const isAdmin = userId === process.env.ADMIN_USER_ID;

  if (!purchase && !isAdmin) {
    return new NextResponse("Forbidden: You haven't purchased this product.", { status: 403 });
  }

  const product = await Product.findById(productId).lean();
  if (!product || !product.filePath || !product.isActive) {
    return new NextResponse('Product file not found', { status: 404 });
  }

  const filePath = path.join(process.cwd(), product.filePath);

  try {
    if (!fs.existsSync(filePath)) {
      return new NextResponse('File not found on server', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const fileSize = fs.statSync(filePath).size;
    const fileName = path.basename(product.filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': fileSize.toString(),
        'Content-Type': 'application/octet-stream',
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
      },
    });
  } catch (error) {
    console.error('Download Error:', error);
    return new NextResponse('File access error', { status: 500 });
  }
}
