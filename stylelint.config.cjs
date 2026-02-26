module.exports = {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['**/node_modules/**', '**/.turbo/**', '**/dist/**'],
  rules: {
    'alpha-value-notation': null,
    'color-function-alias-notation': null,
    'color-function-notation': null,
    'media-feature-range-notation': null,
    'no-descending-specificity': null,
    'selector-class-pattern': null
  }
};
