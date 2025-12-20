import { mergeConfig } from 'vite';
import type { UserConfig } from 'vite';
import baseConfig from '../vite.config';

export const viteFinal = async (_config: UserConfig): Promise<UserConfig> => {
  return mergeConfig(baseConfig, {
    build: {
      lib: undefined,
      rollupOptions: undefined,
    },
    server: {
      hmr: {
        overlay: false,
      },
    },
  });
};

export default viteFinal;
