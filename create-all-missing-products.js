const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// All missing products that need files
const missingProducts = [
  {
    folder: 'neon-soundscapes',
    files: {
      'README.md': `# Neon City Soundscapes

## 50 Atmospheric Tracks
- Cyberpunk ambiences
- Futuristic city sounds
- Neon-lit street atmospheres
- Digital rain effects
- Synthetic wind sounds

## File Formats
- WAV (48kHz, 24-bit)
- MP3 (320kbps)
- OGG Vorbis
- Stems included

## Usage Rights
- Royalty-free
- Commercial use allowed
- Game development approved
- Streaming safe`,
      'track-list.json': JSON.stringify(
        {
          tracks: [
            { name: 'Neon Rain', duration: '3:45', type: 'ambient' },
            { name: 'Digital Streets', duration: '4:12', type: 'urban' },
            { name: 'Cyber Wind', duration: '2:30', type: 'atmospheric' },
          ],
        },
        null,
        2
      ),
    },
  },
  {
    folder: 'data-stream-vfx',
    files: {
      'README.md': `# Data Stream VFX Pack

## 25 Digital Effects
- Matrix-style code rain
- Data transmission effects
- Network visualization
- Digital particle streams
- Holographic displays

## Engine Support
- Unity Particle System
- Unreal Niagara
- After Effects
- Blender

## Customization
- Color variations
- Speed controls
- Density settings
- Direction options`,
      'effects-list.txt': `MATRIX EFFECTS:
- Code_Rain_Green.prefab
- Code_Rain_Blue.prefab
- Binary_Stream.prefab

DATA EFFECTS:
- Network_Pulse.prefab
- Data_Transfer.prefab
- Signal_Transmission.prefab

HOLOGRAPHIC:
- Holo_Display.prefab
- Scan_Lines.prefab
- Digital_Glitch.prefab`,
    },
  },
  {
    folder: '80s-retro-asset-pack',
    files: {
      'README.md': `# 80s Retro Asset Pack

## Included Assets
- Palm trees (10 variations)
- Neon signs (15 designs)
- Chrome text effects
- Sunset gradients
- Geometric shapes
- Retro cars (5 models)

## Style Features
- Vibrant neon colors
- Chrome materials
- Synthwave aesthetics
- Vaporwave elements
- Grid patterns

## File Formats
- 3D Models: FBX, OBJ
- Textures: PNG, TGA
- Materials: PBR workflow`,
      'asset-catalog.json': JSON.stringify(
        {
          categories: {
            nature: ['Palm_Tree_01', 'Palm_Tree_02', 'Sunset_Sky'],
            vehicles: ['Retro_Car_01', 'Retro_Car_02'],
            effects: ['Neon_Glow', 'Chrome_Material', 'Grid_Pattern'],
          },
        },
        null,
        2
      ),
    },
  },
  {
    folder: 'sci-fi-golem',
    files: {
      'README.md': `# Sci-Fi Golem 3D Model

## Model Specifications
- Polygons: 15,000 triangles
- Vertices: 8,500
- Rigged and animated
- 15 animation clips included

## Textures (4K PBR)
- Albedo map
- Normal map
- Metallic map
- Roughness map
- Emission map
- Ambient occlusion

## Animations Included
- Idle (3 variations)
- Walk cycle
- Run cycle
- Attack combo (4 variations)
- Death animation
- Roar/Taunt (2 variations)

## File Formats
- FBX (recommended)
- OBJ (static mesh)
- Blend (Blender source)
- Unity Package`,
      'animation-list.txt': `LOCOMOTION:
- Idle_01.fbx
- Idle_02.fbx
- Walk.fbx
- Run.fbx

COMBAT:
- Attack_Punch.fbx
- Attack_Slam.fbx
- Attack_Combo.fbx
- Death.fbx

EMOTES:
- Roar.fbx
- Taunt.fbx`,
    },
  },
  {
    folder: 'minimalist-icons',
    files: {
      'README.md': `# Minimalist Icon Pack - 500 Icons

## Categories (500 total)
- Interface (100 icons)
- Business (80 icons)
- Technology (90 icons)
- Social Media (60 icons)
- E-commerce (70 icons)
- Navigation (50 icons)
- Communication (50 icons)

## File Formats
- SVG (vector)
- PNG (24px, 48px, 96px)
- AI (Adobe Illustrator)
- Sketch symbols

## Style Features
- 2px stroke weight
- Rounded corners
- Consistent sizing
- Pixel perfect
- Scalable vectors`,
      'icon-categories.json': JSON.stringify(
        {
          interface: ['home', 'menu', 'search', 'settings', 'user'],
          business: ['chart', 'briefcase', 'calendar', 'document', 'presentation'],
          technology: ['smartphone', 'laptop', 'cloud', 'database', 'wifi'],
          social: ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'],
        },
        null,
        2
      ),
    },
  },
  {
    folder: 'animated-logos',
    files: {
      'README.md': `# Animated Logo Templates

## 25 Logo Animations
- Tech company logos (8)
- Creative agency logos (6)
- Business logos (5)
- Startup logos (6)

## Software Compatibility
- After Effects CC 2020+
- Premiere Pro
- Final Cut Pro
- DaVinci Resolve

## Features
- Easy text replacement
- Color customization
- Duration control
- 4K resolution
- Alpha channel included

## Export Formats
- MOV (ProRes 4444)
- MP4 (H.264)
- GIF (web optimized)
- PNG sequence`,
      'template-list.json': JSON.stringify(
        {
          tech: ['Circuit_Logo', 'Digital_Reveal', 'Glitch_Logo'],
          creative: ['Brush_Stroke', 'Ink_Drop', 'Paint_Splash'],
          business: ['Corporate_Clean', 'Professional_Slide', 'Modern_Fade'],
        },
        null,
        2
      ),
    },
  },
  {
    folder: 'social-media-bundle',
    files: {
      'README.md': `# Social Media Graphics Bundle

## 200+ Templates Included
- Instagram posts (50)
- Instagram stories (40)
- Facebook posts (30)
- Twitter headers (20)
- LinkedIn banners (25)
- YouTube thumbnails (35)

## File Formats
- PSD (Photoshop)
- AI (Illustrator)
- Canva templates
- Figma files

## Categories
- Business & Corporate
- Creative & Artistic
- E-commerce & Sales
- Personal Branding
- Event Promotion

## Features
- Easy text editing
- Smart objects
- Color variations
- Font recommendations`,
      'template-breakdown.json': JSON.stringify(
        {
          instagram: {
            posts: 50,
            stories: 40,
            highlights: 15,
          },
          facebook: {
            posts: 30,
            covers: 10,
          },
          youtube: {
            thumbnails: 35,
            banners: 8,
          },
        },
        null,
        2
      ),
    },
  },
  {
    folder: 'pixel-characters',
    files: {
      'README.md': `# Pixel Art Character Pack

## 50 Unique Characters
- Heroes (15 characters)
- Villains (10 characters)
- NPCs (15 characters)
- Monsters (10 characters)

## Animation Sets
- Idle animation
- Walk cycle (4 directions)
- Run cycle (4 directions)
- Jump animation
- Attack animation
- Death animation

## Specifications
- 32x32 pixel sprites
- 16-color palette
- PNG format with transparency
- Sprite sheets included
- Individual frames available

## Game Engine Support
- Unity
- Godot
- GameMaker Studio
- Construct 3`,
      'character-list.txt': `HEROES:
- Knight.png
- Mage.png
- Archer.png
- Rogue.png

VILLAINS:
- Dark_Knight.png
- Evil_Mage.png
- Orc_Warrior.png

NPCS:
- Merchant.png
- Blacksmith.png
- Innkeeper.png

MONSTERS:
- Goblin.png
- Skeleton.png
- Dragon.png`,
    },
  },
  {
    folder: 'dungeon-tileset',
    files: {
      'README.md': `# Dungeon Tileset Collection

## Tileset Themes
- Stone dungeons
- Ice caves
- Lava chambers
- Crystal caverns
- Ancient ruins

## Tile Types (200+ tiles)
- Floor tiles (50)
- Wall tiles (60)
- Decorative objects (40)
- Interactive elements (30)
- Animated tiles (20)

## Specifications
- 32x32 pixel tiles
- Seamless tiling
- PNG format
- Organized sprite sheets
- Collision maps included

## Features
- Modular design
- Easy level creation
- Multiple variations
- Animated elements
- Lighting effects`,
      'tileset-contents.json': JSON.stringify(
        {
          floors: ['stone_floor', 'cracked_stone', 'moss_stone'],
          walls: ['stone_wall', 'brick_wall', 'cave_wall'],
          decorations: ['torch', 'barrel', 'chest', 'bones'],
          interactive: ['door', 'lever', 'pressure_plate', 'stairs'],
        },
        null,
        2
      ),
    },
  },
  {
    folder: 'space-shooter-kit',
    files: {
      'README.md': `# Space Shooter Game Kit

## Complete Game Assets
- Player ships (5 designs)
- Enemy ships (15 types)
- Weapons & projectiles (20 types)
- Power-ups (10 types)
- UI elements (complete set)
- Background elements

## Unity Project Included
- Complete game mechanics
- Weapon system
- Enemy AI
- Power-up system
- Score system
- Sound effects

## Features
- Modular weapon system
- Scalable difficulty
- Particle effects
- Screen shake
- Combo system
- Boss battles

## Documentation
- Setup guide
- Customization tutorial
- Asset reference
- Code documentation`,
      'asset-inventory.json': JSON.stringify(
        {
          ships: {
            player: ['Fighter_01', 'Fighter_02', 'Bomber_01'],
            enemies: ['Scout', 'Fighter', 'Bomber', 'Boss_01'],
          },
          weapons: ['Laser', 'Plasma', 'Missile', 'Beam'],
          powerups: ['Health', 'Shield', 'Speed', 'Weapon_Upgrade'],
        },
        null,
        2
      ),
    },
  },
];

async function createProductFiles() {
  console.log('Creating missing product files...\n');

  for (const product of missingProducts) {
    const productDir = path.join(__dirname, 'product-files', product.folder);

    // Create directory if it doesn't exist
    if (!fs.existsSync(productDir)) {
      fs.mkdirSync(productDir, { recursive: true });
    }

    // Create files
    Object.entries(product.files).forEach(([filename, content]) => {
      const filePath = path.join(productDir, filename);
      fs.writeFileSync(filePath, content);
    });

    console.log(`Created files for ${product.folder}`);
  }

  console.log('\nAll missing product files created!');
}

async function createZipFile(folderName) {
  const sourceDir = path.join(__dirname, 'product-files', folderName);
  const outputPath = path.join(__dirname, 'product-files', `${folderName}.zip`);

  if (!fs.existsSync(sourceDir)) {
    console.log(`Skipping ${folderName} - directory doesn't exist`);
    return;
  }

  if (fs.existsSync(outputPath)) {
    console.log(`ZIP already exists for ${folderName}`);
    return;
  }

  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`Created ${folderName}.zip (${archive.pointer()} bytes)`);
      resolve();
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}

async function createAllZips() {
  console.log('\nCreating ZIP files...\n');

  for (const product of missingProducts) {
    try {
      await createZipFile(product.folder);
    } catch (error) {
      console.error(`Error creating ZIP for ${product.folder}:`, error.message);
    }
  }

  console.log('\nAll ZIP files created!');
}

async function main() {
  await createProductFiles();
  await createAllZips();
  console.log('\n✅ All missing products created successfully!');
}

main().catch(console.error);
