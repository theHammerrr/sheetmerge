const localRules = require("./eslint-rules/index.cjs");

module.exports = [
  {
    ignores: ["**/node_modules/**", "**/.turbo/**", "**/dist/**"],
  },
  {
    files: ["**/*.{js,cjs,mjs,ts,tsx}"],
    plugins: {
      local: localRules,
    },
    rules: {
      "local/max-file-lines": ["error", { max: 100 }],
      "local/max-exports": ["error", { max: 1 }],
    },
  },
];
