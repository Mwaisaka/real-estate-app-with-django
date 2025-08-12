import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir:'././ds_server/static', // Customize build output directory ./build
     emptyOutDir: true,
  },
});