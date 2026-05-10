const fs = require('fs');
let code = fs.readFileSync('app/api/seed/route.ts', 'utf8');

const catMap = {
  '// UI/UX Design Assets': 'UI Kits',
  '// 3D Models & Assets': '3D Models',
  '// Shaders & VFX': 'VFX',
  '// Audio Assets': 'Audio',
  '// Textures & Materials': 'Textures',
  '// Code Templates & Tools': 'Code',
  '// Icons & Graphics': 'Icons',
  '// Game Assets': 'Game Assets'
};

let currentCat = 'Misc';
let lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
  let trimmed = lines[i].trim();
  if (catMap[trimmed]) {
    currentCat = catMap[trimmed];
  }
  
  if (trimmed.startsWith('name:')) {
    lines.splice(i + 1, 0, `    category: '${currentCat}',`);
    i++;
  }
}

fs.writeFileSync('app/api/seed/route.ts', lines.join('\n'));
console.log('Categories added!');
