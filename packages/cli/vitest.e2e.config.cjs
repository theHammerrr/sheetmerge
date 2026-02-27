const { defineConfig } = require('vitest/config');

module.exports = defineConfig({
  test: {
    include: ['e2e/**/*.spec.ts'],
  },
});
