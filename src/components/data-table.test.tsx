import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DataTable } from './data-table';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { createColumnHelper } from '@tanstack/react-table';

// Create a wrapper component with necessary providers
const engine = new Styletron();

interface TestData {
  firstName: string;
  lastName: string;
  age: number;
}

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>{children}</BaseProvider>
  </StyletronProvider>
);

const columnHelper = createColumnHelper<TestData>();

const testColumns = [
  columnHelper.accessor('firstName', {
    header: 'First Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    cell: (info) => info.getValue(),
  }),
];

const testData: TestData[] = [
  { firstName: 'John', lastName: 'Doe', age: 30 },
  { firstName: 'Jane', lastName: 'Smith', age: 25 },
];

describe('DataTable', () => {
  it('renders table headers correctly', () => {
    render(
      <Wrapper>
        <DataTable data={testData} columns={testColumns} />
      </Wrapper>
    );

    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('renders table data correctly', () => {
    render(
      <Wrapper>
        <DataTable data={testData} columns={testColumns} />
      </Wrapper>
    );

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Smith')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('displays loading message when isLoading is true', () => {
    render(
      <Wrapper>
        <DataTable data={[]} columns={testColumns} isLoading={true} />
      </Wrapper>
    );

    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('displays empty message when no data is available', () => {
    const customEmptyMessage = 'No records found';
    render(
      <Wrapper>
        <DataTable data={[]} columns={testColumns} emptyMessage={customEmptyMessage} />
      </Wrapper>
    );

    expect(screen.getByText(customEmptyMessage)).toBeInTheDocument();
  });

  it('renders search bar by default', () => {
    render(
      <Wrapper>
        <DataTable data={testData} columns={testColumns} searchPlaceholder="Search users..." />
      </Wrapper>
    );

    expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument();
  });

  it('hides search bar when showSearchBar is false', () => {
    render(
      <Wrapper>
        <DataTable
          data={testData}
          columns={testColumns}
          showSearchBar={false}
          searchPlaceholder="Search users..."
        />
      </Wrapper>
    );

    expect(screen.queryByPlaceholderText('Search users...')).not.toBeInTheDocument();
  });
});
