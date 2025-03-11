import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TanStackTable } from './tan-stack-table';
import { createColumnHelper } from '@tanstack/react-table';

export default {
  title: 'Components/TanStackTable',
  component: TanStackTable,
} as ComponentMeta<typeof TanStackTable>;

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

const Template: ComponentStory<typeof TanStackTable> = (args) => <TanStackTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  data,
  columns,
};

export const Loading = Template.bind({});
Loading.args = {
  data: [],
  columns,
  isLoading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  data: [],
  columns,
  emptyMessage: 'No people found',
};