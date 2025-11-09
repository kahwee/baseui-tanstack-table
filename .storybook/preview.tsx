import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';

// Handle potential module fetch errors
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    if (event.message.includes('Failed to fetch dynamically imported module')) {
      console.warn('Module fetch error detected. Trying to reload...');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  });
}

// Create a client engine instance
const engine = new Styletron();

const preview: Preview = {
  decorators: [
    (Story) => (
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <Story />
        </BaseProvider>
      </StyletronProvider>
    ),
  ],

  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  tags: ['autodocs']
};

export default preview;
