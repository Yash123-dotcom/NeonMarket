import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { rateLimit, getClientIP } from '@/lib/rate-limit';
import fs from 'fs';
import path from 'path';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  // 1. Rate limiting
  const clientIP = getClientIP(req);
  const rateLimitResult = rateLimit(`download:${clientIP}`, 5, 60000); // 5 downloads per minute

  if (!rateLimitResult.success) {
    return new NextResponse('Rate limit exceeded. Please try again later.', {
      status: 429,
      headers: {
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
      },
    });
  }

  // 2. Check Authentication
  const { userId } = await auth();
  const { productId } = await params;

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // 3. Check if the user actually bought this product
  const purchase = await prisma.order.findFirst({
    where: {
      userId: userId,
      isPaid: true, // Ensure payment was completed
      items: {
        some: {
          productId: productId,
        },
      },
    },
  });

  // Allow download if purchased OR if the user is the Admin
  const isAdmin = userId === process.env.ADMIN_USER_ID;

  if (!purchase && !isAdmin) {
    return new NextResponse("Forbidden: You haven't purchased this product.", { status: 403 });
  }

  // 4. Get Product Details
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product || !product.filePath || !product.isActive) {
    return new NextResponse('Product file not found', { status: 404 });
  }

  // 5. Create download verification record (for tracking)
  await prisma.downloadVerification.create({
    data: {
      productId: productId,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    },
  });

  // 6. Locate the Real File on the Server
  const filePath = path.join(process.cwd(), product.filePath);

  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return new NextResponse('File not found on server', { status: 404 });
    }

    // 7. Read the file
    const fileBuffer = fs.readFileSync(filePath);
    const fileSize = fs.statSync(filePath).size;
    const fileName = path.basename(product.filePath);

    // 8. Serve the file to the browser
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
