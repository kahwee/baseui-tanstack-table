import type { Meta, StoryObj } from '@storybook/react';
import { TanStackTable } from './tan-stack-table';
import { createColumnHelper } from '@tanstack/react-table';

interface Person {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
}

const meta = {
  title: 'Components/TanStackTable',
  component: TanStackTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TanStackTable<Person>>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const Default: Story = {
  args: {
    data,
    columns: columns as any,
  },
};

export const Loading: Story = {
  args: {
    data: [] as Person[],
    columns: columns as any,
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [] as Person[],
    columns: columns as any,
    emptyMessage: 'No people found',
  },
};