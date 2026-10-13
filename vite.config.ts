import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { catalogPlugin } from './scripts/catalogPlugin';
import { socialPlugin } from './scripts/socialPlugin';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: process.env.TRILHA_ENV_DIR,
  plugins: [react(), catalogPlugin(), socialPlugin()],
});
