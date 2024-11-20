import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config to handle React and TypeScript
export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsxInject: `import React from 'react'`, // Ensure React is automatically imported in JSX files
  }
});
