import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@storybook/test';
import { DataTable } from './data-table';
import { samplePersonData, samplePersonColumns, Person } from '../utils/sample-data';

const DataTableWithPerson = DataTable<Person>;

const meta = {
  title: 'Components/DataTable',
  component: DataTableWithPerson,
  parameters: {
    layout: 'centered',
  },
  args: {
    data: samplePersonData,
    columns: samplePersonColumns,
    showSearchBar: true,
    searchPlaceholder: 'Search...',
    searchFields: ['firstName', 'lastName'],
    isLoading: false,
    emptyMessage: 'No data available',
  },
  argTypes: {
    data: {
      control: false,
      description: 'Array of data to display in the table',
    },
    columns: {
      control: false,
      description: 'Column definitions for the table',
    },
    showSearchBar: {
      control: 'boolean',
      description: 'Show or hide the search bar',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
    },
    searchFields: {
      control: false,
      description: 'Fields to search across',
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message displayed when no data is available',
    },
    initialSorting: {
      control: false,
      description: 'Initial sorting configuration',
    },
    pagination: {
      control: false,
      description: 'Pagination configuration',
    },
    onPageChange: {
      action: 'pageChanged',
      description: 'Callback when page changes',
    },
  },
} satisfies Meta<typeof DataTableWithPerson>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default DataTable with all features enabled: search, sorting, and sample data.
 * Use the controls panel to toggle features dynamically.
 */
export const Default: Story = {};

/**
 * Shows the loading state while data is being fetched.
 * Toggle the `isLoading` control to see the loading indicator.
 */
export const Loading: Story = {
  args: {
    data: [],
    isLoading: true,
  },
};

/**
 * Displays a custom message when the table has no data.
 * Useful for showing helpful hints to users.
 */
export const Empty: Story = {
  args: {
    data: [],
    isLoading: false,
    emptyMessage: 'No people found',
  },
};

/**
 * Demonstrates server-side pagination with a limited dataset.
 * The table shows 5 rows from a total of 25 records across 5 pages.
 */
export const WithPagination: Story = {
  args: {
    data: samplePersonData.slice(0, 5),
    pagination: {
      currentPage: 1,
      pageSize: 5,
      totalPages: 5,
      onPageChange: fn(),
    },
  },
};

/**
 * Table pre-sorted by age in descending order.
 * Shows how to configure initial sorting using `initialSorting`.
 */
export const SortedByAge: Story = {
  args: {
    initialSorting: [{ id: 'age', desc: true }],
  },
};
