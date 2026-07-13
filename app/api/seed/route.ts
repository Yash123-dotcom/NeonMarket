import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/lib/models/User';
import { Product } from '@/lib/models/Product';
import { auth } from '@clerk/nextjs/server';

const SEEDER_USER_ID = 'user_admin_seeder_007';

const sampleProducts = [
  {
    name: 'Cyberpunk UI Kit',
    category: 'UI Kits',
    description: 'A futuristic UI kit with neon elements, perfect for sci-fi games and apps. Includes over 100 components, buttons, forms, and navigation elements.',
    price: 4999,
    filePath: 'product-files/cyberpunk-ui-kit.zip',
    stock: 100,
  },
  {
    name: 'Minimalist Dashboard Template',
    category: 'UI Kits',
    description: 'Clean and modern dashboard template with React components. Perfect for SaaS applications, admin panels, and analytics dashboards.',
    price: 3999,
    filePath: 'product-files/minimalist-dashboard.zip',
    stock: 150,
  },
  {
    name: 'Mobile App UI Kit - iOS & Android',
    category: 'UI Kits',
    description: 'Complete mobile app UI kit with 50+ screens for e-commerce, social media, and productivity apps. Includes Figma and Sketch files.',
    price: 5999,
    filePath: 'product-files/mobile-app-ui-kit.zip',
    stock: 75,
  },
  {
    name: 'Sci-Fi Golem 3D Model',
    category: '3D Models',
    description: 'High-poly, game-ready 3D model of a rock golem infused with sci-fi technology. Rigged and animated with 15 different animations.',
    price: 7999,
    filePath: 'product-files/sci-fi-golem.zip',
    stock: 50,
  },
  {
    name: 'Low Poly Nature Pack',
    category: '3D Models',
    description: 'Collection of 200+ low poly nature assets including trees, rocks, plants, and terrain pieces. Perfect for indie games and mobile apps.',
    price: 2999,
    filePath: 'product-files/low-poly-nature-pack.zip',
    stock: 200,
  },
  {
    name: 'Futuristic Vehicle Collection',
    category: '3D Models',
    description: 'Set of 12 high-quality futuristic vehicles including hovercars, spaceships, and mechs. Game-ready with PBR textures.',
    price: 8999,
    filePath: 'product-files/futuristic-vehicles.zip',
    stock: 30,
  },
  {
    name: 'Holographic Shader Pack',
    category: 'Other',
    description: 'Collection of 20 advanced holographic and glitch effect shaders for Unity and Unreal Engine. Includes documentation and examples.',
    price: 2999,
    filePath: 'product-files/holographic-shader-pack.zip',
    stock: 100,
  },
  {
    name: 'Data Stream VFX',
    category: 'Other',
    description: 'Pack of visual effects for creating digital data streams, matrix-style code rain, and network visualizations. 25 different effects included.',
    price: 2499,
    filePath: 'product-files/data-stream-vfx.zip',
    stock: 120,
  },
  {
    name: 'Particle Magic - Fire & Smoke',
    category: 'Other',
    description: 'Realistic fire and smoke particle systems for games and animations. Includes 30 different variations and customizable parameters.',
    price: 3499,
    filePath: 'product-files/particle-magic.zip',
    stock: 80,
  },
  {
    name: 'Neon City Soundscapes',
    category: 'Audio',
    description: 'Atmospheric sound pack with 50 tracks designed for cyberpunk and futuristic settings. Loops and one-shots included with stems.',
    price: 1999,
    filePath: 'product-files/neon-soundscapes.zip',
    stock: 300,
  },
  {
    name: 'Epic Orchestral Music Pack',
    category: 'Audio',
    description: '20 epic orchestral tracks perfect for games, trailers, and cinematic projects. Includes full tracks, loops, and individual stems.',
    price: 4999,
    filePath: 'product-files/epic-orchestral-pack.zip',
    stock: 150,
  },
  {
    name: 'Retro Synthwave Collection',
    category: 'Audio',
    description: '80s-inspired synthwave music collection with 15 tracks. Perfect for retro games, vlogs, and nostalgic projects.',
    price: 2999,
    filePath: 'product-files/retro-synthwave.zip',
    stock: 200,
  },
  {
    name: '80s Retro Asset Pack',
    category: 'Other',
    description: 'Vibrant collection of 3D models and textures with a retro 80s theme. Includes palm trees, sunsets, chrome text, and neon materials.',
    price: 3499,
    filePath: 'product-files/80s-retro-asset-pack.zip',
    stock: 100,
  },
  {
    name: 'PBR Material Library - Metals',
    category: 'Other',
    description: 'Professional PBR material library featuring 100 different metal surfaces. 4K textures with albedo, normal, roughness, and metallic maps.',
    price: 3999,
    filePath: 'product-files/pbr-metals.zip',
    stock: 90,
  },
  {
    name: 'Seamless Fabric Textures',
    category: 'Other',
    description: 'High-resolution seamless fabric textures including cotton, silk, denim, leather, and more. Perfect for fashion and interior design.',
    price: 2499,
    filePath: 'product-files/fabric-textures.zip',
    stock: 180,
  },
  {
    name: 'React E-commerce Starter',
    category: 'Templates',
    description: 'Complete React e-commerce template with Next.js, Razorpay integration, and modern design. Includes admin panel and user authentication.',
    price: 6999,
    filePath: 'product-files/react-ecommerce-starter.zip',
    stock: 60,
  },
  {
    name: 'SaaS Landing Page Template',
    category: 'Templates',
    description: 'Modern SaaS landing page template with conversion-optimized sections. Built with Tailwind CSS and includes 10 different variations.',
    price: 2999,
    filePath: 'product-files/saas-landing-template.zip',
    stock: 120,
  },
  {
    name: 'Node.js API Boilerplate',
    category: 'Templates',
    description: 'Production-ready Node.js API boilerplate with authentication, database integration, testing, and deployment scripts. Saves weeks of setup.',
    price: 4999,
    filePath: 'product-files/nodejs-api-boilerplate.zip',
    stock: 80,
  },
  {
    name: 'Minimalist Icon Pack - 500 Icons',
    category: 'Icons',
    description: 'Clean and modern icon pack with 500 icons in multiple formats (SVG, PNG, AI). Perfect for web and mobile applications.',
    price: 1999,
    filePath: 'product-files/minimalist-icons.zip',
    stock: 400,
  },
  {
    name: 'Animated Logo Templates',
    category: 'Icons',
    description: 'Collection of 25 animated logo templates for After Effects. Includes tech, creative, and business themes with easy customization.',
    price: 3999,
    filePath: 'product-files/animated-logos.zip',
    stock: 70,
  },
  {
    name: 'Social Media Graphics Bundle',
    category: 'Icons',
    description: 'Complete social media graphics bundle with 200+ templates for Instagram, Facebook, Twitter, and LinkedIn. Includes PSD and Canva files.',
    price: 2499,
    filePath: 'product-files/social-media-bundle.zip',
    stock: 250,
  },
  {
    name: 'Pixel Art Character Pack',
    category: 'Other',
    description: '50 unique pixel art characters with walking, jumping, and attack animations. Perfect for 2D platformer and RPG games.',
    price: 3499,
    filePath: 'product-files/pixel-characters.zip',
    stock: 90,
  },
  {
    name: 'Dungeon Tileset Collection',
    category: 'Other',
    description: 'Complete dungeon tileset for 2D games including walls, floors, decorations, and interactive objects. Includes multiple themes.',
    price: 2999,
    filePath: 'product-files/dungeon-tileset.zip',
    stock: 110,
  },
  {
    name: 'Space Shooter Game Kit',
    category: 'Other',
    description: 'Complete space shooter game kit with ships, enemies, weapons, and UI elements. Includes Unity project files and documentation.',
    price: 5999,
    filePath: 'product-files/space-shooter-kit.zip',
    stock: 45,
  },
];

export async function GET() {
  try {
    if (process.env.NODE_ENV === 'production') {
      return new NextResponse('Seeder disabled in production', { status: 403 });
    }

    const { userId } = await auth();
    if (!userId || userId !== process.env.ADMIN_USER_ID) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectDB();

    // Upsert the admin/seeder user.
    const user = await User.findByIdAndUpdate(
      SEEDER_USER_ID,
      { 
        _id: SEEDER_USER_ID, 
        email: 'admin@neonmarket.io', 
        name: 'NeonMarket Admin', 
        isSeller: true,
        razorpayAccountId: 'acc_mockseeder123'
      },
      { upsert: true, new: true }
    );

    // Clean existing seeder products
    await Product.deleteMany({ userId: user._id });

    // Map Unsplash images to local verified premium assets
    const productsToInsert = sampleProducts.map((product) => {
      let imagePath = "/images/ui-kit.png";
      if (product.category === "3D Models" || product.category === "Other") {
        imagePath = "/images/3d-assets.png";
      } else if (product.category === "Icons" || product.category === "Audio") {
        imagePath = "/images/icons.png";
      }
      return { 
        ...product, 
        imagePath, 
        userId: user._id,
        isActive: true,
      };
    });

    // Insert new products
    await Product.insertMany(productsToInsert);

    return NextResponse.json({
      message: 'Database seeded successfully with local assets!',
      productsCreated: sampleProducts.length,
      totalValue: `$${(sampleProducts.reduce((sum, p) => sum + p.price, 0) / 100).toFixed(2)}`,
    });
  } catch (error) {
    console.error('[SEEDING_ERROR]', error);
    return NextResponse.json(
      {
        error: 'Seeding failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
