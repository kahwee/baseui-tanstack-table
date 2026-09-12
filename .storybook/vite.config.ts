import type { UserConfig } from 'vite'
import { mergeConfig } from 'vite'
import baseConfig from '../vite.config.ts'

export const viteFinal = async (_config: UserConfig): Promise<UserConfig> => {
  return mergeConfig(baseConfig, {
    build: {
      lib: undefined,
      rollupOptions: undefined,
      chunkSizeWarningLimit: 1500,
    },
    server: {
      hmr: {
        overlay: false,
      },
    },
  })
}

export default viteFinal
