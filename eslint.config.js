// @ts-check
const lightwing = require('@lightwing/eslint-config').default

module.exports = lightwing(
  {
    ignores: [
      'dist',
      'node_modules',
      '*.svelte',
      '*.snap',
      '*.d.ts',
      'coverage',
      'js_test',
      'local-data',
    ],
  },
  {
    files: [
      'src/log.ts',
      'tests/**/*.ts',
    ],
    rules: {
      'no-console': 'off',
    },
  },
)
