import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'Probe',
      fileName: 'index',
      formats: ['es', 'umd']
    },
    minify: true,
    sourcemap: true
  },
  plugins: []
}); 