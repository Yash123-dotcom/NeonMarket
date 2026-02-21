import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/lib/models/User';
import { Product } from '@/lib/models/Product';


// A unique ID for our seeder/admin user
const SEEDER_USER_ID = 'user_admin_seeder_007';

// Enhanced product data with local images and real downloadable files
const sampleProducts = [
  // UI/UX Design Assets
  {
    name: 'Cyberpunk UI Kit',
    description:
      'A futuristic UI kit with neon elements, perfect for sci-fi games and apps. Includes over 100 components, buttons, forms, and navigation elements.',
    price: 4999, // $49.99
    imagePath: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop',
    filePath: 'product-files/cyberpunk-ui-kit.zip',
    stock: 100,
  },
  {
    name: 'Minimalist Dashboard Template',
    description:
      'Clean and modern dashboard template with React components. Perfect for SaaS applications, admin panels, and analytics dashboards.',
    price: 3999, // $39.99
    imagePath: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop',
    filePath: 'product-files/minimalist-dashboard.zip',
    stock: 150,
  },
  {
    name: 'Mobile App UI Kit - iOS & Android',
    description:
      'Complete mobile app UI kit with 50+ screens for e-commerce, social media, and productivity apps. Includes Figma and Sketch files.',
    price: 5999, // $59.99
    imagePath: 'https://images.unsplash.com/photo-1616423640778-28d1b5322ddc?q=80&w=2940&auto=format&fit=crop',
    filePath: 'product-files/mobile-app-ui-kit.zip',
    stock: 75,
  },

  // 3D Models & Assets
  {
    name: 'Sci-Fi Golem 3D Model',
    description:
      'High-poly, game-ready 3D model of a rock golem infused with sci-fi technology. Rigged and animated with 15 different animations.',
    price: 7999, // $79.99
    imagePath: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=2940&auto=format&fit=crop',
    filePath: 'product-files/sci-fi-golem.zip',
    stock: 50,
  },
  {
    name: 'Low Poly Nature Pack',
    description:
      'Collection of 200+ low poly nature assets including trees, rocks, plants, and terrain pieces. Perfect for indie games and mobile apps.',
    price: 2999, // $29.99
    imagePath: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop',
    filePath: 'product-files/low-poly-nature-pack.zip',
    stock: 200,
  },
  {
    name: 'Futuristic Vehicle Collection',
    description:
      'Set of 12 high-quality futuristic vehicles including hovercars, spaceships, and mechs. Game-ready with PBR textures.',
    price: 8999, // $89.99
    imagePath: 'https://images.unsplash.com/photo-1605739999661-8608e42da8b7?q=80&w=2836&auto=format&fit=crop',
    filePath: 'product-files/futuristic-vehicles.zip',
    stock: 30,
  },

  // Shaders & VFX
  {
    name: 'Holographic Shader Pack',
    description:
      'Collection of 20 advanced holographic and glitch effect shaders for Unity and Unreal Engine. Includes documentation and examples.',
    price: 2999, // $29.99
    imagePath: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2787&auto=format&fit=crop',
    filePath: 'product-files/holographic-shader-pack.zip',
    stock: 100,
  },
  {
    name: 'Data Stream VFX',
    description:
      'Pack of visual effects for creating digital data streams, matrix-style code rain, and network visualizations. 25 different effects included.',
    price: 2499, // $24.99
    imagePath: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2940&auto=format&fit=crop',
    filePath: 'product-files/data-stream-vfx.zip',
    stock: 120,
  },
  {
    name: 'Particle Magic - Fire & Smoke',
    description:
      'Realistic fire and smoke particle systems for games and animations. Includes 30 different variations and customizable parameters.',
    price: 3499, // $34.99
    imagePath: 'https://images.unsplash.com/photo-1506173078430-c3d5e236ad65?q=80&w=2940&auto=format&fit=crop',
    filePath: 'product-files/particle-magic.zip',
    stock: 80,
  },

  // Audio Assets
  {
    name: 'Neon City Soundscapes',
    description:
      'Atmospheric sound pack with 50 tracks designed for cyberpunk and futuristic settings. Loops and one-shots included with stems.',
    price: 1999, // $19.99
    imagePath: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2874&auto=format&fit=crop',
    filePath: 'product-files/neon-soundscapes.zip',
    stock: 300,
  },
  {
    name: 'Epic Orchestral Music Pack',
    description:
      '20 epic orchestral tracks perfect for games, trailers, and cinematic projects. Includes full tracks, loops, and individual stems.',
    price: 4999, // $49.99
    imagePath: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=2940&auto=format&fit=crop',
    filePath: 'product-files/epic-orchestral-pack.zip',
    stock: 150,
  },
  {
    name: 'Retro Synthwave Collection',
    description:
      '80s-inspired synthwave music collection with 15 tracks. Perfect for retro games, vlogs, and nostalgic projects.',
    price: 2999, // $29.99
    imagePath: 'https://images.unsplash.com/photo-1614149484421-dcd8185578cb?q=80&w=2874&auto=format&fit=crop',
    filePath: 'product-files/retro-synthwave.zip',
    stock: 200,
  },

  // Textures & Materials
  {
    name: '80s Retro Asset Pack',
    description:
      'Vibrant collection of 3D models and textures with a retro 80s theme. Includes palm trees, sunsets, chrome text, and neon materials.',
    price: 3499, // $34.99
    imagePath: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2787&auto=format&fit=crop',
    filePath: 'product-files/80s-retro-asset-pack.zip',
    stock: 100,
  },
  {
    name: 'PBR Material Library - Metals',
    description:
      'Professional PBR material library featuring 100 different metal surfaces. 4K textures with albedo, normal, roughness, and metallic maps.',
    price: 3999, // $39.99
    imagePath: 'https://images.unsplash.com/photo-1601370552763-233775b8bebf?q=80&w=2832&auto=format&fit=crop',
    filePath: 'product-files/pbr-metals.zip',
    stock: 90,
  },
  {
    name: 'Seamless Fabric Textures',
    description:
      'High-resolution seamless fabric textures including cotton, silk, denim, leather, and more. Perfect for fashion and interior design.',
    price: 2499, // $24.99
    imagePath: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2872&auto=format&fit=crop',
    filePath: 'product-files/fabric-textures.zip',
    stock: 180,
  },

  // Code Templates & Tools
  {
    name: 'React E-commerce Starter',
    description:
      'Complete React e-commerce template with Next.js, Stripe integration, and modern design. Includes admin panel and user authentication.',
    price: 6999, // $69.99
    imagePath: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2970&auto=format&fit=crop',
    filePath: 'product-files/react-ecommerce-starter.zip',
    stock: 60,
  },
  {
    name: 'SaaS Landing Page Template',
    description:
      'Modern SaaS landing page template with conversion-optimized sections. Built with Tailwind CSS and includes 10 different variations.',
    price: 2999, // $29.99
    imagePath: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2815&auto=format&fit=crop',
    filePath: 'product-files/saas-landing-template.zip',
    stock: 120,
  },
  {
    name: 'Node.js API Boilerplate',
    description:
      'Production-ready Node.js API boilerplate with authentication, database integration, testing, and deployment scripts. Saves weeks of setup.',
    price: 4999, // $49.99
    imagePath: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2940&auto=format&fit=crop',
    filePath: 'product-files/nodejs-api-boilerplate.zip',
    stock: 80,
  },

  // Icons & Graphics
  {
    name: 'Minimalist Icon Pack - 500 Icons',
    description:
      'Clean and modern icon pack with 500 icons in multiple formats (SVG, PNG, AI). Perfect for web and mobile applications.',
    price: 1999, // $19.99
    imagePath: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2874&auto=format&fit=crop',
    filePath: 'product-files/minimalist-icons.zip',
    stock: 400,
  },
  {
    name: 'Animated Logo Templates',
    description:
      'Collection of 25 animated logo templates for After Effects. Includes tech, creative, and business themes with easy customization.',
    price: 3999, // $39.99
    imagePath: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2940&auto=format&fit=crop',
    filePath: 'product-files/animated-logos.zip',
    stock: 70,
  },
  {
    name: 'Social Media Graphics Bundle',
    description:
      'Complete social media graphics bundle with 200+ templates for Instagram, Facebook, Twitter, and LinkedIn. Includes PSD and Canva files.',
    price: 2499, // $24.99
    imagePath: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=2874&auto=format&fit=crop',
    filePath: 'product-files/social-media-bundle.zip',
    stock: 250,
  },

  // Game Assets
  {
    name: 'Pixel Art Character Pack',
    description:
      '50 unique pixel art characters with walking, jumping, and attack animations. Perfect for 2D platformer and RPG games.',
    price: 3499, // $34.99
    imagePath: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2940&auto=format&fit=crop',
    filePath: 'product-files/pixel-characters.zip',
    stock: 90,
  },
  {
    name: 'Dungeon Tileset Collection',
    description:
      'Complete dungeon tileset for 2D games including walls, floors, decorations, and interactive objects. Includes multiple themes.',
    price: 2999, // $29.99
    imagePath: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2940&auto=format&fit=crop',
    filePath: 'product-files/dungeon-tileset.zip',
    stock: 110,
  },
  {
    name: 'Space Shooter Game Kit',
    description:
      'Complete space shooter game kit with ships, enemies, weapons, and UI elements. Includes Unity project files and documentation.',
    price: 5999, // $59.99
    imagePath: 'https://images.unsplash.com/photo-1541560052-77ec1bbc09f7?q=80&w=3042&auto=format&fit=crop',
    filePath: 'product-files/space-shooter-kit.zip',
    stock: 45,
  },
];

export async function GET() {
  try {
    // Only allow in development
    if (process.env.NODE_ENV === 'production') {
      return new NextResponse('Seeder disabled in production', { status: 403 });
    }

    await connectDB();

    // Upsert the admin/seeder user.
    const user = await User.findByIdAndUpdate(
      SEEDER_USER_ID,
      { _id: SEEDER_USER_ID, email: 'admin@neonmarket.io', name: 'NeonMarket Admin', isSeller: true },
      { upsert: true, new: true }
    );

    // Clean existing seeder products
    await Product.deleteMany({ userId: user._id });

    // Insert new products
    await Product.insertMany(sampleProducts.map((product) => ({ ...product, userId: user._id })));

    return NextResponse.json({
      message: 'Database seeded successfully with enhanced product catalog!',
      productsCreated: sampleProducts.length,
      categories: {
        'UI/UX Design': 3,
        '3D Models': 3,
        'Shaders & VFX': 3,
        'Audio Assets': 3,
        'Textures & Materials': 3,
        'Code Templates': 3,
        'Icons & Graphics': 3,
        'Game Assets': 3,
      },
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
