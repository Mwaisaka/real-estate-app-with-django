import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir:'./build', // Customize build output directory
     emptyOutDir: true,
  },
});