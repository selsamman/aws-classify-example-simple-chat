import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function apiTarget() {
  if (process.env.AWSPROXY) return process.env.AWSPROXY;
  try {
    const configDir = dirname(fileURLToPath(import.meta.url));
    const { WebsiteUrl } = JSON.parse(readFileSync(resolve(configDir, '../cloud/output.json'), 'utf8'));
    if (WebsiteUrl) return `https://${WebsiteUrl}`;
  } catch {
    // A deployment is needed before the local web server can proxy API calls.
  }
  return undefined;
}

export default defineConfig(({ mode }) => {
  const target = mode === 'offline' ? 'http://127.0.0.1:4000' : apiTarget();
  return {
    plugins: [react()],
    server: {
      port: 3000,
      strictPort: true,
      proxy: target ? { '/api': { target, changeOrigin: true } } : undefined,
    },
  };
});
