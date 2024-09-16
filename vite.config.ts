import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry   : resolve(__dirname, 'src/index.ts'),
      formats : ['es', 'cjs'],
      fileName: 'index',
    },
  },
  test: {
    globals: true,
    coverage: {
      provider: 'v8'
    }
  },
})
