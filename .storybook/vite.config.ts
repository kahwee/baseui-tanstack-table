import { mergeConfig } from 'vite';
import type { StorybookConfig } from '@storybook/react-vite';
import baseConfig from '../vite.config';

/**
 * This function is used to extend the base Vite configuration
 * with Storybook-specific settings.
 */
export const viteFinal = async (config: any) => {
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