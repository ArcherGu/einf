import lightwing from '@lightwing/eslint-config'

export default lightwing(
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
  {
    files: [
      'tests/**/*.ts',
    ],
    rules: {
      'antfu/no-import-dist': 'off',
    },
  },
)
