import type { Preview } from '@storybook/react-vite';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';

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
};

export default preview;
