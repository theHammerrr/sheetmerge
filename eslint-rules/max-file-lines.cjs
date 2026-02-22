'use strict';

const DEFAULT_MAX_LINES = 100;

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce a maximum number of lines per file.'
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
    const max = options.max || DEFAULT_MAX_LINES;
    const sourceCode = context.getSourceCode();
    const lineCount = sourceCode.lines.length;

    if (lineCount <= max) {
      return {};
    }

    return {
      Program(node) {
        context.report({
          node,
          message: `File has ${lineCount} lines (max ${max}).`
        });
      }
    };
  }
};
