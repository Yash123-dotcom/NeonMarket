const fs = require('fs');
const path = require('path');

// Create a simple SVG image generator for product placeholders
function createProductImage(productName, category, color1, color2) {
  const width = 500;
  const height = 500;

  // Create a gradient background with category-specific colors
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <!-- Background -->
    <rect width="100%" height="100%" fill="url(#grad)"/>
    
    <!-- Category icon area -->
    <rect x="50" y="50" width="400" height="300" rx="20" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    
    <!-- Category text -->
    <text x="250" y="220" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="white" filter="url(#glow)">${category}</text>
    
    <!-- Product name -->
    <text x="250" y="420" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="rgba(255,255,255,0.9)">${productName}</text>
    
    <!-- Decorative elements -->
    <circle cx="100" cy="100" r="30" fill="rgba(255,255,255,0.1)"/>
    <circle cx="400" cy="400" r="40" fill="rgba(255,255,255,0.1)"/>
    <rect x="350" y="80" width="60" height="60" rx="10" fill="rgba(255,255,255,0.1)"/>
  </svg>`;

  return svg;
}

// Product categories with their color schemes
const categoryColors = {
  'UI/UX': ['#6366f1', '#8b5cf6'], // Purple to indigo
  '3D Models': ['#059669', '#10b981'], // Green
  Shaders: ['#dc2626', '#f59e0b'], // Red to orange
  Audio: ['#7c3aed', '#a855f7'], // Purple
  Textures: ['#0891b2', '#06b6d4'], // Cyan
  Code: ['#ea580c', '#f97316'], // Orange
  Icons: ['#be123c', '#e11d48'], // Pink/red
  Games: ['#1d4ed8', '#3b82f6'], // Blue
};

// All products with their categories
const products = [
  { name: 'Cyberpunk UI Kit', category: 'UI/UX' },
  { name: 'Minimalist Dashboard', category: 'UI/UX' },
  { name: 'Mobile App UI Kit', category: 'UI/UX' },
  { name: 'Sci-Fi Golem', category: '3D Models' },
  { name: 'Low Poly Nature Pack', category: '3D Models' },
  { name: 'Futuristic Vehicles', category: '3D Models' },
  { name: 'Holographic Shaders', category: 'Shaders' },
  { name: 'Data Stream VFX', category: 'Shaders' },
  { name: 'Particle Magic', category: 'Shaders' },
  { name: 'Neon Soundscapes', category: 'Audio' },
  { name: 'Epic Orchestral', category: 'Audio' },
  { name: 'Retro Synthwave', category: 'Audio' },
  { name: '80s Retro Assets', category: 'Textures' },
  { name: 'PBR Metals', category: 'Textures' },
  { name: 'Fabric Textures', category: 'Textures' },
  { name: 'React E-commerce', category: 'Code' },
  { name: 'SaaS Landing Page', category: 'Code' },
  { name: 'Node.js API', category: 'Code' },
  { name: 'Minimalist Icons', category: 'Icons' },
  { name: 'Animated Logos', category: 'Icons' },
  { name: 'Social Media Bundle', category: 'Icons' },
  { name: 'Pixel Characters', category: 'Games' },
  { name: 'Dungeon Tileset', category: 'Games' },
  { name: 'Space Shooter Kit', category: 'Games' },
];

// Create images directory
const imagesDir = path.join(__dirname, 'public', 'images', 'products');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Generate images for all products
console.log('Creating product images...\n');

products.forEach((product, index) => {
  const colors = categoryColors[product.category] || ['#6b7280', '#9ca3af'];
  const svg = createProductImage(product.name, product.category, colors[0], colors[1]);

  // Create filename from product name
  const filename =
    product.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') + '.svg';

  const filepath = path.join(imagesDir, filename);
  fs.writeFileSync(filepath, svg);

  console.log(`Created ${filename}`);
});

console.log(`\n✅ Created ${products.length} product images in /public/images/products/`);

// Also create a mapping file for easy reference
const imageMapping = products.reduce((acc, product, index) => {
  const filename =
    product.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') + '.svg';

  acc[product.name] = `/images/products/${filename}`;
  return acc;
}, {});

fs.writeFileSync(path.join(__dirname, 'image-mapping.json'), JSON.stringify(imageMapping, null, 2));

console.log('✅ Created image mapping file: image-mapping.json');
