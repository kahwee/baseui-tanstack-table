import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './data-table';
import { 
  samplePersonData,
  samplePersonColumns,
  Person 
} from '../utils/sample-data';

// Use DataTable with Person type
const DataTableWithPerson = DataTable<Person>;

const meta = {
  title: 'Components/DataTable',
  component: DataTableWithPerson,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTableWithPerson>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: samplePersonData,
    columns: samplePersonColumns,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns: samplePersonColumns,
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: samplePersonColumns,
    emptyMessage: 'No people found',
  },
};

export const InitialSorting: Story = {
  args: {
    data: samplePersonData,
    columns: samplePersonColumns,
    initialSorting: [{ id: 'age', desc: true }],
  },
};

export const WithSearch: Story = {
  args: {
    data: samplePersonData,
    columns: samplePersonColumns,
    searchPlaceholder: 'Search by name...',
    searchFields: ['firstName', 'lastName'],
  },
};

export const WithoutSearch: Story = {
  args: {
    data: samplePersonData,
    columns: samplePersonColumns,
    showSearchBar: false,
  },
};