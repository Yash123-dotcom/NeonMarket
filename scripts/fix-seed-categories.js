const fs = require('fs');
let code = fs.readFileSync('app/api/seed/route.ts', 'utf8');

code = code.replace(/category: 'VFX',/g, "category: 'Other',");
code = code.replace(/category: 'Textures',/g, "category: 'Other',");
code = code.replace(/category: 'Code',/g, "category: 'Templates',");
code = code.replace(/category: 'Game Assets',/g, "category: 'Other',");

fs.writeFileSync('app/api/seed/route.ts', code);
console.log('Categories fixed!');
