import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
    },
    dedupe: ['react', 'react-dom', 'baseui'],
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'baseui',
      '@tanstack/react-table',
      'styletron-engine-atomic',
      'styletron-react',
    ],
  },
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      name: 'BaseuiDataTable',
      formats: ['es', 'umd'],
      fileName: (format) => `baseui-data-table.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'baseui',
        '@tanstack/react-table',
        'styletron-engine-atomic',
        'styletron-react',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          baseui: 'baseui',
          '@tanstack/react-table': 'TanStackTable',
          'styletron-engine-atomic': 'StyletronEngineAtomic',
          'styletron-react': 'StyletronReact',
        },
      },
    },
  },
})
