import { loadEnv, Plugin } from 'vite';
import { handleContribution, handleLinkInfo } from '../server/contributions';

const serverKeys = /^(GITHUB_APP_|TURNSTILE_SECRET_KEY|CONTRIBUTIONS_|SITE_URL)/;

// Runs the Vercel functions in api/ during `vite dev`, which does not execute them itself.
export function apiDevPlugin(): Plugin {
  return {
    name: 'trilha-api-dev',
    apply: 'serve',
    configResolved(config) {
      const env = loadEnv(config.mode, config.envDir || config.root, '');
      for (const [key, value] of Object.entries(env))
        if (serverKeys.test(key) && process.env[key] === undefined) process.env[key] = value;
    },
    configureServer(server) {
      server.middlewares.use('/api/contributions', (req, res) => {
        handleContribution(req, res);
      });
      server.middlewares.use('/api/link-info', (req, res) => {
        handleLinkInfo(req, res);
      });
    },
  };
}
