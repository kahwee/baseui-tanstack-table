import React from 'react';
import ReactDOM from 'react-dom/client';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { DataTable } from './components/data-table';
import { samplePersonData, samplePersonColumns } from './utils/sample-data';

const engine = new Styletron();

const App = () => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <div style={{ padding: '20px' }}>
          <h1>BaseUI Data Table Example</h1>
          <DataTable 
            data={samplePersonData} 
            columns={samplePersonColumns}
          />
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);