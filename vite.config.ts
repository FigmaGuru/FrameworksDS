import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
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
          if (id.includes('features/colors')) return 'colors';
          if (id.includes('features/spacing')) return 'spacing';
          if (id.includes('features/typography')) return 'type';
        }
      }
    }
  }
});
