const { defineConfig } = require('vitest/config');

module.exports = defineConfig({
  test: {
    include: [
      'src/functions/parse-csv-file/parse-csv-file.spec.ts',
      'src/functions/run-local-merge/run-local-merge.spec.ts',
      'src/functions/run-local-join-merge/run-local-join-merge.spec.ts',
      'src/functions/set-merge-error/set-merge-error.spec.ts',
      'src/functions/set-merge-result/set-merge-result.spec.ts',
      'src/functions/use-join-mapping/use-join-mapping.spec.ts',
      'src/functions/update-join-groups/update-join-groups.spec.ts',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary'],
      include: [
        'src/functions/parse-csv-file/parse-csv-file.ts',
        'src/functions/run-local-merge/run-local-merge.ts',
        'src/functions/run-local-join-merge/run-local-join-merge.ts',
        'src/functions/set-merge-error/set-merge-error.ts',
        'src/functions/set-merge-result/set-merge-result.ts',
      ],
      thresholds: {
        statements: 80,
        branches: 70,
        functions: 80,
        lines: 80,
      },
    },
  },
});
