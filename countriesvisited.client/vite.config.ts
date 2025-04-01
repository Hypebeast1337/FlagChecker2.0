import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@svgmap': path.resolve(__dirname, 'node_modules/svgmap/src/scss'), // Alias for svgmap SCSS files
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '', // No additional data needed for now
      },
    },
  },
});
