import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/test-vite-lit.ts',
      formats: ['es']
    },
    rollupOptions: {
      external: /^lit/
    }
  }
})
