import { mergeConfig } from 'vite';
import type { UserConfig } from 'vite';
import baseConfig from '../vite.config';

/**
 * This function is used to extend the base Vite configuration
 * with Storybook-specific settings.
 */
export const viteFinal = async (_config: UserConfig): Promise<UserConfig> => {
  // Merge base config with Storybook's config
  return mergeConfig(baseConfig, {
    // Storybook specific configurations
    optimizeDeps: {
      include: ['storybook-dark-mode'],
    },
    build: {
      // Remove lib configuration for Storybook
      lib: undefined,
      rollupOptions: undefined,
    },
    server: {
      // Configure server for HMR
      hmr: {
        overlay: false,
      },
      watch: {
        usePolling: true,
      },
    },
  });
};

export default viteFinal;
