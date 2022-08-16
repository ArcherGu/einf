/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { VitePluginDoubleshot } from 'vite-plugin-doubleshot'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePluginDoubleshot({
      type: 'electron',
      main: 'dist/index.js',
      entry: 'src/index.ts',
      outDir: 'dist',
      external: ['electron'],
      electron: {
        preload: {
          entry: 'src/preload.ts',
        },
      },
    }),
  ],
})
