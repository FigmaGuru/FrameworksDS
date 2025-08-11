import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        ui: 'index.html',
        code: 'src/code.ts'
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks(id) {
          if (id.includes('react')) return 'react';
        }
      }
    }
  }
});
