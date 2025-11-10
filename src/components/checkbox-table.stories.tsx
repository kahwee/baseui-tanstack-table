import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@storybook/test';
import { CheckboxTable } from './checkbox-table';
import { samplePersonData, samplePersonColumns, Person } from '../utils/sample-data';

const CheckboxTableWithPerson = CheckboxTable<Person>;

const meta = {
  title: 'Components/CheckboxTable',
  component: CheckboxTableWithPerson,
  parameters: {
    layout: 'centered',
  },
  args: {
    data: samplePersonData,
    columns: samplePersonColumns,
    onRowSelectionChange: fn(),
    showSearchBar: true,
    searchPlaceholder: 'Search...',
    searchFields: ['firstName', 'lastName'],
    isLoading: false,
    emptyMessage: 'No data available',
    checkboxLocation: 'start' as const,
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
    onRowSelectionChange: {
      action: 'rowSelectionChanged',
      description: 'Callback when row selection changes',
    },
    initialRowSelection: {
      control: false,
      description: 'Initial row selection state',
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
    checkboxLocation: {
      control: 'radio',
      options: ['start', 'end'],
      description: 'Position of the checkbox column',
    },
    initialSorting: {
      control: false,
      description: 'Initial sorting configuration',
    },
    pagination: {
      control: false,
      description: 'Pagination configuration',
    },
  },
} satisfies Meta<typeof CheckboxTableWithPerson>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default CheckboxTable with row selection enabled.
 * Use the controls panel to toggle features dynamically.
 * Monitor the Actions panel to see selection changes.
 */
export const Default: Story = {};

/**
 * Table with pre-selected rows (first and third rows).
 * Demonstrates how to set initial row selection.
 */
export const WithInitialSelection: Story = {
  args: {
    initialRowSelection: { 0: true, 2: true },
  },
};

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
 * Useful for providing feedback to users.
 */
export const Empty: Story = {
  args: {
    data: [],
    isLoading: false,
    emptyMessage: 'No people found',
  },
};

/**
 * Checkboxes positioned at the end of the row instead of the beginning.
 * Toggle the `checkboxLocation` control to switch between start and end positions.
 */
export const CheckboxesAtEnd: Story = {
  args: {
    checkboxLocation: 'end',
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
