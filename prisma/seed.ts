import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // 1. Find the Admin User (You)
  // We attach products to the first user found in the DB.
  let user = await prisma.user.findFirst();

  if (!user) {
    console.log("⚠️ No users found. Creating a dummy 'Admin' user for seeding...");
    user = await prisma.user.create({
      data: {
        id: "user_dummy_admin",
        email: "admin@neonmarket.com",
        name: "Neon Admin",
        isSeller: true,
        stripeConnectAccountId: "acct_dummy123"
      }
    });
    console.log(`✅ Created dummy user: ${user.email}`);
  }

  console.log(`👤 Found user: ${user.email} (${user.id})`);

  // 2. The Products Data
  const products = [
    {
      name: "Neon City Soundscapes",
      description: "50 Atmospheric Tracks including cyberpunk ambiences, futuristic city sounds, and neon-lit street atmospheres. Perfect for game devs and creators.",
      price: 2900,
      imagePath: "https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=2940&auto=format&fit=crop",
      filePath: "product-files/neon-soundscapes.zip",
      userId: user.id,
      stock: 100,
    },
    {
      name: "Data Stream VFX Pack",
      description: "25 Digital Effects including Matrix-style code rain, data transmission effects, and holographic displays. Compatible with Unity and Unreal.",
      price: 3500,
      imagePath: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2940&auto=format&fit=crop",
      filePath: "product-files/data-stream-vfx.zip",
      userId: user.id,
      stock: 50,
    },
    {
      name: "80s Retro Asset Pack",
      description: "Includes palm trees, neon signs, chrome text effects, and sunset gradients. A complete kit for Synthwave aesthetics.",
      price: 4500,
      imagePath: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2940&auto=format&fit=crop",
      filePath: "product-files/80s-retro-asset-pack.zip",
      userId: user.id,
      stock: 75,
    },
    {
      name: "Sci-Fi Golem 3D Model",
      description: "High-quality rigged and animated 3D model. 15,000 tris, 4K PBR textures. Includes walk, run, and attack animations.",
      price: 5900,
      imagePath: "https://images.unsplash.com/photo-1535378437327-1e54a37c2293?q=80&w=2940&auto=format&fit=crop",
      filePath: "product-files/sci-fi-golem.zip",
      userId: user.id,
      stock: 20,
    },
    {
      name: "Minimalist Icon Pack",
      description: "500 clean, pixel-perfect icons for interface, business, and technology. SVG, PNG, and AI formats included.",
      price: 1500,
      imagePath: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2940&auto=format&fit=crop",
      filePath: "product-files/minimalist-icons.zip",
      userId: user.id,
      stock: 500,
    },
    {
      name: "Animated Logo Templates",
      description: "25 professional logo animations for After Effects. Easy customization for tech, creative, and business brands.",
      price: 3900,
      imagePath: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2940&auto=format&fit=crop",
      filePath: "product-files/animated-logos.zip",
      userId: user.id,
      stock: 100,
    },
    {
      name: "Social Media Bundle",
      description: "200+ templates for Instagram, Twitter, and LinkedIn. Boost your engagement with high-quality, editable designs.",
      price: 2500,
      imagePath: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=2874&auto=format&fit=crop",
      filePath: "product-files/social-media-bundle.zip",
      userId: user.id,
      stock: 200,
    },
    {
      name: "Pixel Art Character Pack",
      description: "50 unique characters including heroes, villains, and monsters. 32x32 sprites with full animation sets.",
      price: 1900,
      imagePath: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2940&auto=format&fit=crop", // Reusing a techy image or find a pixel one via search if needed, but this works for now as a placeholder
      filePath: "product-files/pixel-characters.zip",
      userId: user.id,
      stock: 150,
    },
    {
      name: "Dungeon Tileset Collection",
      description: "Build infinite levels with this modular tileset. Includes stone, ice, and lava themes. 200+ tiles.",
      price: 2200,
      imagePath: "https://images.unsplash.com/photo-1614728853913-1e22026131c1?q=80&w=2940&auto=format&fit=crop",
      filePath: "product-files/dungeon-tileset.zip",
      userId: user.id,
      stock: 300,
    },
    {
      name: "Space Shooter Game Kit",
      description: "Complete Unity project with ships, weapons, enemies, and UI. The perfect starter kit for your next spaced-themed game.",
      price: 8900,
      imagePath: "https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?q=80&w=2874&auto=format&fit=crop",
      filePath: "product-files/space-shooter-kit.zip",
      userId: user.id,
      stock: 50,
    },
    {
      name: "NeonMarket Source Code",
      description: "The complete source code for this marketplace. Built with Next.js 15, Stripe Connect, and Clerk.",
      price: 19900,
      imagePath: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2940&auto=format&fit=crop",
      filePath: "product-files/neon-market-source.zip",
      userId: user.id,
      stock: 10,
    },
  ];

  // 3. Insert into Database
  for (const productData of products) {
    const existingProduct = await prisma.product.findFirst({
      where: { name: productData.name },
    });

    if (existingProduct) {
      console.log(`❕ Product already exists, skipping: ${productData.name}`);
    } else {
      await prisma.product.create({
        data: productData,
      });
      console.log(`✅ Created product: ${productData.name}`);
    }
  }

  console.log("🚀 Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });