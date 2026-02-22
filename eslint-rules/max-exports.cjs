'use strict';

const DEFAULT_MAX_EXPORTS = 1;

function countNonTypeExports(programNode) {
  let count = 0;

  for (const node of programNode.body) {
    if (node.type === 'ExportDefaultDeclaration') {
      count += 1;
      continue;
    }

    if (node.type === 'ExportAllDeclaration') {
      if (node.exportKind !== 'type') {
        count += 1;
      }
      continue;
    }

    if (node.type === 'ExportNamedDeclaration') {
      if (node.exportKind === 'type') {
        continue;
      }

      if (node.declaration) {
        const declarationType = node.declaration.type;
        if (
          declarationType === 'TSInterfaceDeclaration' ||
          declarationType === 'TSTypeAliasDeclaration' ||
          declarationType === 'TSEnumDeclaration'
        ) {
          continue;
        }
      }

      count += 1;
    }
  }

  return count;
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Limit non-type exports per file.'
    },
    schema: [
      {
        type: 'object',
        properties: {
          max: { type: 'integer', minimum: 1 }
        },
        additionalProperties: false
      }
    ]
  },
  create(context) {
    const options = context.options[0] || {};
    const max = options.max || DEFAULT_MAX_EXPORTS;

    return {
      Program(node) {
        const exportCount = countNonTypeExports(node);

        if (exportCount <= max) {
          return;
        }

        context.report({
          node,
          message: `File has ${exportCount} non-type exports (max ${max}).`
        });
      }
    };
  }
};
