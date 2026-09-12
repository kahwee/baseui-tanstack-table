import { BaseProvider, LightTheme } from 'baseui'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { DataTable } from './components/data-table'
import { samplePersonColumns, samplePersonData } from './utils/sample-data'

const engine = new Styletron()

const App = () => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <div style={{ padding: '20px' }}>
          <h1>BaseUI Data Table Example</h1>
          <p>Type in the search box to filter the table by first or last name.</p>
          <DataTable
            data={samplePersonData}
            columns={samplePersonColumns}
            searchPlaceholder="Search by name..."
            searchFields={['firstName', 'lastName']}
          />
        </div>
      </BaseProvider>
    </StyletronProvider>
  )
}

const root = document.getElementById('root')

if (!root) {
  throw new Error('Missing #root element')
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
