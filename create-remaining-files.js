const fs = require('fs');
const path = require('path');

// Create remaining product files
const remainingProducts = [
  {
    folder: 'futuristic-vehicles',
    files: {
      'README.md': `# Futuristic Vehicle Collection

## 12 Vehicles Included
- Hovercars (4 models)
- Spaceships (4 models) 
- Mechs (4 models)

## Specifications
- High-poly models (5K-15K triangles)
- PBR textures (4K resolution)
- Rigged and animated
- Game-ready optimization

## File Formats
- .fbx (Autodesk FBX)
- .blend (Blender)
- .max (3ds Max)
- .unitypackage

## Textures Included
- Albedo maps
- Normal maps
- Metallic maps
- Roughness maps
- Emission maps`,
      'vehicle-specs.json': JSON.stringify(
        {
          vehicles: [
            { name: 'Cyber Hovercar', polygons: 8500, textures: '4K PBR' },
            { name: 'Plasma Fighter', polygons: 12000, textures: '4K PBR' },
            { name: 'Battle Mech', polygons: 15000, textures: '4K PBR' },
          ],
        },
        null,
        2
      ),
    },
  },
  {
    folder: 'particle-magic',
    files: {
      'README.md': `# Particle Magic - Fire & Smoke

## 30 Effects Included
- Realistic fire effects
- Smoke simulations
- Explosion particles
- Magical effects
- Environmental particles

## Engine Support
- Unity Particle System
- Unreal Niagara
- Blender
- After Effects

## Customizable Parameters
- Size and scale
- Color gradients
- Emission rates
- Lifetime curves
- Velocity patterns`,
      'effect-list.txt': `FIRE EFFECTS:
- Campfire.prefab
- Torch.prefab
- Explosion.prefab
- Dragon_Breath.prefab

SMOKE EFFECTS:
- Chimney_Smoke.prefab
- Cigarette_Smoke.prefab
- Industrial_Smoke.prefab

MAGICAL EFFECTS:
- Sparkles.prefab
- Magic_Aura.prefab
- Teleport.prefab`,
    },
  },
  {
    folder: 'retro-synthwave',
    files: {
      'README.md': `# Retro Synthwave Collection

## 15 Tracks Included
- Synthwave classics
- Retrowave vibes
- 80s nostalgia
- Cyberpunk atmosphere

## File Formats
- WAV (44.1kHz, 24-bit)
- MP3 (320kbps)
- MIDI files included
- Stems available

## Usage Rights
- Royalty-free music
- Commercial use allowed
- YouTube safe
- Streaming platform approved`,
      'tracklist.json': JSON.stringify(
        {
          tracks: [
            { name: 'Neon Nights', duration: '4:23', bpm: 128 },
            { name: 'Cyber Dreams', duration: '3:45', bpm: 120 },
            { name: 'Retro Future', duration: '5:12', bpm: 140 },
          ],
        },
        null,
        2
      ),
    },
  },
  {
    folder: 'pbr-metals',
    files: {
      'README.md': `# PBR Material Library - Metals

## 100 Metal Materials
- Steel variations
- Aluminum finishes
- Copper and brass
- Titanium surfaces
- Weathered metals

## Texture Resolution
- 4K (4096x4096)
- Seamless tiling
- Multiple variations

## Maps Included
- Albedo (Base Color)
- Normal (Bump)
- Metallic
- Roughness
- Ambient Occlusion

## Software Compatibility
- Blender
- Maya
- 3ds Max
- Substance Painter
- Unity/Unreal`,
      'material-list.txt': `STEEL MATERIALS:
- Steel_Brushed_01
- Steel_Polished_01
- Steel_Rusted_01
- Steel_Galvanized_01

ALUMINUM MATERIALS:
- Aluminum_Anodized_01
- Aluminum_Brushed_01
- Aluminum_Cast_01

COPPER MATERIALS:
- Copper_Polished_01
- Copper_Oxidized_01
- Brass_Antique_01`,
    },
  },
  {
    folder: 'fabric-textures',
    files: {
      'README.md': `# Seamless Fabric Textures

## Fabric Types
- Cotton (10 variations)
- Silk (8 variations)
- Denim (6 variations)
- Leather (12 variations)
- Wool (8 variations)

## Texture Details
- 2K and 4K resolution
- Seamless tiling
- Realistic detail
- Color variations

## Applications
- Fashion design
- Interior visualization
- Product rendering
- Game development`,
      'fabric-catalog.json': JSON.stringify(
        {
          categories: {
            cotton: ['White Cotton', 'Blue Denim', 'Canvas'],
            silk: ['Smooth Silk', 'Textured Silk'],
            leather: ['Brown Leather', 'Black Leather', 'Vintage Leather'],
          },
        },
        null,
        2
      ),
    },
  },
  {
    folder: 'saas-landing-template',
    files: {
      'README.md': `# SaaS Landing Page Template

## 10 Variations Included
- Tech startup
- Finance app
- Healthcare SaaS
- E-commerce platform
- Analytics dashboard

## Built With
- Tailwind CSS
- Alpine.js
- Responsive design
- SEO optimized

## Sections Included
- Hero section
- Features showcase
- Pricing tables
- Testimonials
- FAQ section
- Contact forms`,
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SaaS Landing Page</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div class="container mx-auto px-6 text-center">
            <h1 class="text-5xl font-bold mb-6">
                Transform Your Business with Our SaaS Solution
            </h1>
            <p class="text-xl mb-8 max-w-2xl mx-auto">
                Streamline your workflow, boost productivity, and scale your business with our powerful platform.
            </p>
            <button class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Start Free Trial
            </button>
        </div>
    </section>
    
    <!-- Features Section -->
    <section class="py-20">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold text-center mb-12">Powerful Features</h2>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="text-center">
                    <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl">⚡</span>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Lightning Fast</h3>
                    <p class="text-gray-600">Optimized for speed and performance</p>
                </div>
                <!-- More feature cards... -->
            </div>
        </div>
    </section>
</body>
</html>`,
    },
  },
  {
    folder: 'nodejs-api-boilerplate',
    files: {
      'package.json': JSON.stringify(
        {
          name: 'nodejs-api-boilerplate',
          version: '1.0.0',
          description: 'Production-ready Node.js API boilerplate',
          main: 'server.js',
          scripts: {
            start: 'node server.js',
            dev: 'nodemon server.js',
            test: 'jest',
          },
          dependencies: {
            express: '^4.18.0',
            mongoose: '^7.0.0',
            jsonwebtoken: '^9.0.0',
            bcryptjs: '^2.4.3',
            cors: '^2.8.5',
            helmet: '^6.0.0',
          },
        },
        null,
        2
      ),
      'server.js': `const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
      'README.md': `# Node.js API Boilerplate

## Features
- Express.js server
- MongoDB with Mongoose
- JWT authentication
- Password hashing
- CORS enabled
- Security headers
- Error handling
- Input validation
- Rate limiting
- API documentation

## Quick Start
\`\`\`bash
npm install
npm run dev
\`\`\`

## Environment Variables
\`\`\`
PORT=5000
MONGODB_URI=mongodb://localhost:27017/api
JWT_SECRET=your_jwt_secret
\`\`\`

## API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/users/profile
- PUT /api/users/profile`,
    },
  },
];

// Create directories and files
remainingProducts.forEach((product) => {
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

console.log('All remaining product files created successfully!');
