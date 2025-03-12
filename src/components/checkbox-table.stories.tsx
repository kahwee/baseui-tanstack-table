import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxTable } from './checkbox-table';
import { samplePersonData, samplePersonColumns, Person } from '../utils/sample-data';
import { RowSelectionState } from '@tanstack/react-table';

// Use CheckboxTable with Person type
const CheckboxTableWithPerson = CheckboxTable<Person>;

const meta = {
  title: 'Components/CheckboxTable',
  component: CheckboxTableWithPerson,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CheckboxTableWithPerson>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: samplePersonData,
    columns: samplePersonColumns,
  },
};

export const WithInitialSelection: Story = {
  args: {
    data: samplePersonData,
    columns: samplePersonColumns,
    initialRowSelection: { 0: true, 2: true }, // Select first and third row
  },
};

// Example with custom row selection handling and console output
export const WithSelectionCallback: Story = {
  args: {
    data: samplePersonData,
    columns: samplePersonColumns,
    onRowSelectionChange: (rowSelection: RowSelectionState) => {
      console.log('Selected rows:', rowSelection);
    },
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

export const CheckboxesAtEnd: Story = {
  args: {
    data: samplePersonData,
    columns: samplePersonColumns,
    checkboxLocation: 'end',
  },
};
