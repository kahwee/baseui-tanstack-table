import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
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
      entry: resolve(__dirname, 'src/index.ts'),
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
});
