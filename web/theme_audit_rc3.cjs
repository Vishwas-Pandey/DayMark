const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.jsx')) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
};

const srcDir = path.join(__dirname, 'src');
const files = walkSync(srcDir);

const replacements = [
  { pattern: /bg-white/g, replacement: 'bg-surface-primary' },
  { pattern: /bg-black/g, replacement: 'bg-surface-primary' },
  { pattern: /text-white/g, replacement: 'text-text-heading' },
  { pattern: /text-black/g, replacement: 'text-text-heading' },
  { pattern: /border-white\/10/g, replacement: 'border-border-default' },
  { pattern: /border-black\/10/g, replacement: 'border-border-default' },
  { pattern: /bg-zinc-900/g, replacement: 'bg-surface-primary' },
  { pattern: /bg-zinc-800/g, replacement: 'bg-surface-secondary' },
  { pattern: /bg-zinc-950/g, replacement: 'bg-surface-primary' },
  { pattern: /text-zinc-400/g, replacement: 'text-text-muted' },
  { pattern: /text-zinc-500/g, replacement: 'text-text-muted' },
  { pattern: /text-zinc-300/g, replacement: 'text-text-body' },
  { pattern: /text-zinc-100/g, replacement: 'text-text-heading' },
  { pattern: /text-gray-900/g, replacement: 'text-text-heading' },
  { pattern: /text-gray-500/g, replacement: 'text-text-muted' },
  { pattern: /text-gray-400/g, replacement: 'text-text-muted' },
  { pattern: /text-gray-300/g, replacement: 'text-text-body' },
  { pattern: /bg-gray-50/g, replacement: 'bg-surface-secondary' },
  { pattern: /bg-gray-100/g, replacement: 'bg-surface-secondary' },
  { pattern: /bg-gray-800/g, replacement: 'bg-surface-secondary' },
  { pattern: /border-gray-100/g, replacement: 'border-border-default' },
  { pattern: /border-gray-200/g, replacement: 'border-border-default' },
  { pattern: /border-gray-300/g, replacement: 'border-border-default' },
  { pattern: /border-gray-800/g, replacement: 'border-border-default' },
  { pattern: /from-\[\#050505\]/g, replacement: 'from-surface-primary' },
  { pattern: /via-\[\#050505\]/g, replacement: 'via-surface-primary' },
  { pattern: /to-\[\#050505\]/g, replacement: 'to-surface-primary' }
];

let filesModified = 0;
let totalReplacements = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  for (const { pattern, replacement } of replacements) {
    const matches = content.match(pattern);
    if (matches) {
      totalReplacements += matches.length;
      content = content.replace(pattern, replacement);
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    filesModified++;
    console.log(`Modified: ${path.basename(file)}`);
  }
}

console.log(`\nAudit Complete:`);
console.log(`Files Modified: ${filesModified}`);
console.log(`Hardcoded Values Removed: ${totalReplacements}`);
