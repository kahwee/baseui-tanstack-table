import React from 'react';
import ReactDOM from 'react-dom/client';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { TanStackTable } from './components/tan-stack-table';
import { createColumnHelper } from '@tanstack/react-table';

const engine = new Styletron();

interface Person {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
}

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor('firstName', {
    header: 'First Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('visits', {
    header: 'Visits',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => info.getValue(),
  }),
];

const data: Person[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    visits: 10,
    status: 'active',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    age: 25,
    visits: 5,
    status: 'inactive',
  },
  {
    firstName: 'Bob',
    lastName: 'Johnson',
    age: 45,
    visits: 20,
    status: 'active',
  },
  {
    firstName: 'Alice',
    lastName: 'Williams',
    age: 32,
    visits: 15,
    status: 'inactive',
  },
];

const App = () => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <div style={{ padding: '20px' }}>
          <h1>BaseUI TanStack Table Example</h1>
          <TanStackTable data={data} columns={columns} />
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