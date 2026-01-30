const fs = require('fs');
const path = require('path');

// Create product files for all products
const products = [
  {
    folder: 'minimalist-dashboard',
    files: {
      'package.json': JSON.stringify(
        {
          name: 'minimalist-dashboard',
          version: '1.0.0',
          description: 'Clean and modern dashboard template',
          main: 'Dashboard.tsx',
          dependencies: {
            react: '^18.0.0',
            recharts: '^2.5.0',
            tailwindcss: '^3.0.0',
          },
        },
        null,
        2
      ),
      'README.md': `# Minimalist Dashboard Template

## Features
- Clean, modern design
- Responsive layout
- Interactive charts
- Real-time data display
- TypeScript support

## Installation
\`\`\`bash
npm install
npm start
\`\`\`

## Components Included
- Dashboard main component
- Stat cards
- Chart components
- Activity feed
- Navigation sidebar

## License
Commercial use allowed`,
    },
  },
  {
    folder: 'mobile-app-ui-kit',
    files: {
      'README.md': `# Mobile App UI Kit

## 50+ Screens Included
- Onboarding screens
- Login/Signup flows
- E-commerce screens
- Profile pages
- Settings screens
- Chat interfaces

## File Formats
- Figma (.fig)
- Sketch (.sketch)
- Adobe XD (.xd)
- PNG exports

## Design System
- Color palette
- Typography scale
- Component library
- Icon set (100+ icons)

## Platforms
- iOS design guidelines
- Android Material Design
- Cross-platform compatibility`,
      'design-tokens.json': JSON.stringify(
        {
          colors: {
            primary: '#007AFF',
            secondary: '#5856D6',
            success: '#34C759',
            warning: '#FF9500',
            error: '#FF3B30',
          },
          typography: {
            heading: 'SF Pro Display',
            body: 'SF Pro Text',
            sizes: [12, 14, 16, 18, 20, 24, 28, 32],
          },
        },
        null,
        2
      ),
    },
  },
  {
    folder: 'low-poly-nature-pack',
    files: {
      'README.md': `# Low Poly Nature Pack

## 200+ Assets Included
- Trees (Pine, Oak, Birch, Palm)
- Rocks and stones
- Grass and plants
- Terrain pieces
- Water elements

## File Formats
- .fbx (Autodesk FBX)
- .obj (Wavefront OBJ)
- .blend (Blender native)
- .unity (Unity package)

## Specifications
- Low poly count (50-500 triangles)
- Optimized for mobile/indie games
- Hand-painted textures
- Modular design

## Usage Rights
- Commercial and personal use
- Modify and redistribute allowed
- Attribution appreciated`,
      'asset-list.txt': `TREES:
- Pine_Tree_01.fbx (234 tris)
- Pine_Tree_02.fbx (187 tris)
- Oak_Tree_01.fbx (456 tris)
- Palm_Tree_01.fbx (123 tris)

ROCKS:
- Rock_Small_01.fbx (45 tris)
- Rock_Medium_01.fbx (89 tris)
- Rock_Large_01.fbx (234 tris)

PLANTS:
- Grass_Patch_01.fbx (23 tris)
- Bush_01.fbx (67 tris)
- Flower_01.fbx (34 tris)

TERRAIN:
- Ground_Tile_01.fbx (4 tris)
- Hill_01.fbx (156 tris)
- Cliff_01.fbx (289 tris)`,
    },
  },
  {
    folder: 'holographic-shader-pack',
    files: {
      'README.md': `# Holographic Shader Pack

## 20 Shaders Included
- Hologram effect
- Glitch distortion
- Scan lines
- Digital noise
- Matrix rain
- Neon glow

## Engine Support
- Unity (Built-in RP)
- Unity URP
- Unity HDRP
- Unreal Engine 4/5

## Features
- Customizable parameters
- Performance optimized
- Mobile-friendly versions
- Documentation included

## Installation
1. Import package into your project
2. Apply materials to objects
3. Customize parameters in inspector`,
      'shader-list.hlsl': `// Holographic Shader Pack - Shader List

Shader "Custom/Hologram"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
        _HoloColor ("Hologram Color", Color) = (0, 1, 1, 1)
        _Intensity ("Intensity", Range(0, 2)) = 1
        _ScanSpeed ("Scan Speed", Range(0, 10)) = 1
        _GlitchAmount ("Glitch Amount", Range(0, 1)) = 0.1
    }
    
    SubShader
    {
        Tags { "RenderType"="Transparent" "Queue"="Transparent" }
        Blend SrcAlpha OneMinusSrcAlpha
        ZWrite Off
        
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            
            #include "UnityCG.cginc"
            
            // Shader implementation here...
            ENDCG
        }
    }
}`,
    },
  },
  {
    folder: 'epic-orchestral-pack',
    files: {
      'README.md': `# Epic Orchestral Music Pack

## 20 Tracks Included
- Battle themes
- Cinematic scores
- Emotional pieces
- Victory fanfares
- Ambient orchestral

## File Formats
- WAV (44.1kHz, 16-bit)
- MP3 (320kbps)
- FLAC (lossless)
- Individual stems available

## Track List
1. Epic Battle - 3:45
2. Heroes Rise - 4:12
3. Final Victory - 2:58
4. Emotional Journey - 5:23
5. Dark Prophecy - 4:45

## Usage Rights
- Royalty-free
- Commercial use allowed
- No attribution required
- Sync rights included`,
      'track-info.json': JSON.stringify(
        {
          tracks: [
            {
              name: 'Epic Battle',
              duration: '3:45',
              bpm: 140,
              key: 'C minor',
              mood: 'Intense, Heroic',
            },
            {
              name: 'Heroes Rise',
              duration: '4:12',
              bpm: 120,
              key: 'D major',
              mood: 'Uplifting, Triumphant',
            },
          ],
        },
        null,
        2
      ),
    },
  },
  {
    folder: 'react-ecommerce-starter',
    files: {
      'package.json': JSON.stringify(
        {
          name: 'react-ecommerce-starter',
          version: '1.0.0',
          description: 'Complete React e-commerce template',
          scripts: {
            dev: 'next dev',
            build: 'next build',
            start: 'next start',
          },
          dependencies: {
            next: '^14.0.0',
            react: '^18.0.0',
            stripe: '^14.0.0',
            tailwindcss: '^3.0.0',
            '@clerk/nextjs': '^4.0.0',
          },
        },
        null,
        2
      ),
      'README.md': `# React E-commerce Starter

## Features
- Next.js 14 with App Router
- Stripe payment integration
- User authentication (Clerk)
- Product catalog
- Shopping cart
- Order management
- Admin dashboard
- Responsive design

## Quick Start
\`\`\`bash
npm install
npm run dev
\`\`\`

## Environment Variables
\`\`\`
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
\`\`\`

## Included Pages
- Homepage
- Product listing
- Product details
- Shopping cart
- Checkout
- User dashboard
- Admin panel`,
      'components/ProductCard.jsx': `import React from 'react';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">
            \${product.price}
          </span>
          <Link 
            href={\`/products/\${product.id}\`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;`,
    },
  },
];

// Create directories and files
products.forEach((product) => {
  const productDir = path.join(__dirname, 'product-files', product.folder);

  // Create directory if it doesn't exist
  if (!fs.existsSync(productDir)) {
    fs.mkdirSync(productDir, { recursive: true });
  }

  // Create files
  Object.entries(product.files).forEach(([filename, content]) => {
    const filePath = path.join(productDir, filename);
    const fileDir = path.dirname(filePath);

    // Create subdirectory if needed
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }

    fs.writeFileSync(filePath, content);
  });

  console.log(`Created files for ${product.folder}`);
});

console.log('All product files created successfully!');
