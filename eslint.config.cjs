const localRules = require('./eslint-rules/index.cjs');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');

module.exports = [
  {
    ignores: ["**/node_modules/**", "**/.turbo/**", "**/dist/**"]
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      local: localRules,
      '@typescript-eslint': tsPlugin
    },
    rules: {
      "local/max-file-lines": ["error", { "max": 100 }],
      "local/max-exports": ["error", { "max": 1 }],
      "local/function-structure": ["error"],
      "@typescript-eslint/consistent-type-assertions": ["error", { "assertionStyle": "never" }]
    }
  },
  {
    files: ["**/*.{js,cjs,mjs}"],
    plugins: {
      local: localRules
    },
    rules: {
      "local/max-file-lines": ["error", { "max": 100 }],
      "local/max-exports": ["error", { "max": 1 }]
    }
  }
];
