const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// List of all product folders that need ZIP files
const productFolders = [
  'futuristic-vehicles',
  'particle-magic',
  'retro-synthwave',
  'pbr-metals',
  'fabric-textures',
  'saas-landing-template',
  'nodejs-api-boilerplate',
  // Additional products that might need ZIP files
  'neon-soundscapes',
  'data-stream-vfx',
  '80s-retro-asset-pack',
  'sci-fi-golem',
  'minimalist-icons',
  'animated-logos',
  'social-media-bundle',
  'pixel-characters',
  'dungeon-tileset',
  'space-shooter-kit',
];

async function createZipFile(folderName) {
  const sourceDir = path.join(__dirname, 'product-files', folderName);
  const outputPath = path.join(__dirname, 'product-files', `${folderName}.zip`);

  // Check if source directory exists
  if (!fs.existsSync(sourceDir)) {
    console.log(`Skipping ${folderName} - directory doesn't exist`);
    return;
  }

  // Check if ZIP already exists
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
  console.log('Creating ZIP files for all products...\n');

  for (const folder of productFolders) {
    try {
      await createZipFile(folder);
    } catch (error) {
      console.error(`Error creating ZIP for ${folder}:`, error.message);
    }
  }

  console.log('\nAll ZIP files created successfully!');
}

createAllZips();
