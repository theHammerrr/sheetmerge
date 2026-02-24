'use strict';

const fs = require('fs');
const path = require('path');

function checkRequiredFiles(filePath, baseName) {
  const dir = path.dirname(filePath);
  const expectedIndex = path.join(dir, 'index.ts');
  const expectedSpec = path.join(dir, `${baseName}.spec.ts`);

  return {
    hasIndex: fs.existsSync(expectedIndex),
    hasSpec: fs.existsSync(expectedSpec),
    expectedIndex,
    expectedSpec,
  };
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce function folder structure with index and spec files.',
    },
    schema: [],
  },
  create(context) {
    return {
      Program(node) {
        const filename = context.getFilename();

        if (filename === '<input>' || filename.includes('node_modules')) {
          return;
        }

        if (!filename.endsWith('.ts') || filename.endsWith('.d.ts')) {
          return;
        }

        if (filename.endsWith('.spec.ts') || filename.endsWith('.test.ts')) {
          return;
        }

        if (path.basename(filename) === 'index.ts') {
          return;
        }

        const folderName = path.basename(path.dirname(filename));
        const baseName = path.basename(filename, '.ts');

        if (folderName !== baseName) {
          context.report({
            node,
            message: `File name must match folder name (${folderName}).`,
          });

          return;
        }

        const required = checkRequiredFiles(filename, baseName);

        if (!required.hasIndex) {
          context.report({
            node,
            message: 'Missing index.ts in function folder.',
          });
        }

        if (!required.hasSpec) {
          context.report({
            node,
            message: `Missing ${baseName}.spec.ts in function folder.`,
          });
        }
      },
    };
  },
};
