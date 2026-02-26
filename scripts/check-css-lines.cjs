const fs = require('fs');
const path = require('path');

const MAX_LINES = 100;
const ROOT = process.cwd();
const IGNORED_DIRS = new Set(['node_modules', '.turbo', 'dist', '.git', '.centy']);

function countLines(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  if (content.length === 0) {

    return 0;
  }

  return content.split(/\r\n|\r|\n/).length;
}

function walk(dirPath, files) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) {
        continue;
      }

      walk(fullPath, files);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.css')) {
      files.push(fullPath);
    }
  }
}

function main() {
  const files = [];

  walk(ROOT, files);

  const violations = files
    .map((file) => ({ file, lines: countLines(file) }))
    .filter((entry) => entry.lines > MAX_LINES);

  if (violations.length === 0) {

    return;
  }

  console.error('CSS files must be split to 100 lines or fewer.');

  violations.forEach((entry) => {
    console.error(`${entry.file} has ${entry.lines} lines.`);
  });

  process.exit(1);
}

main();
