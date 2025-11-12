import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-openapi',
      closeBundle() {
        copyFileSync('openapi.yaml', 'dist/openapi.yaml');
      }
    }
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
