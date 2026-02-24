'use strict';

const maxFileLines = require('./max-file-lines.cjs');
const maxExports = require('./max-exports.cjs');
const functionStructure = require('./function-structure.cjs');

module.exports = {
  rules: {
    'max-file-lines': maxFileLines,
    'max-exports': maxExports,
    'function-structure': functionStructure,
  },
};
