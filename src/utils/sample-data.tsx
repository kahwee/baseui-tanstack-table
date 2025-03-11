import { ReactElement } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Tag, HIERARCHY } from 'baseui/tag';

// Define the Person interface for sample data
export interface Person {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: 'active' | 'disabled';
}

// Create a column helper for Person data
export const personColumnHelper = createColumnHelper<Person>();

// Define sample columns for Person data
export const samplePersonColumns = [
  personColumnHelper.accessor('firstName', {
    header: 'First Name',
    cell: info => info.getValue(),
  }),
  personColumnHelper.accessor('lastName', {
    header: 'Last Name',
    cell: info => info.getValue(),
  }),
  personColumnHelper.accessor('age', {
    header: 'Age',
    cell: info => info.getValue(),
  }),
  personColumnHelper.accessor('visits', {
    header: 'Visits',
    cell: info => info.getValue(),
  }),
  personColumnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const status = info.getValue();
      const hierarchy = status === 'active' ? HIERARCHY.primary : HIERARCHY.secondary;
      const label = status === 'active' ? 'Active' : 'Disabled';
      
      return (
        <Tag closeable={false} hierarchy={hierarchy} kind="neutral">
          {label}
        </Tag>
      ) as ReactElement;
    },
    sortingFn: (rowA, rowB, columnId) => {
      const statusA = rowA.getValue(columnId);
      const statusB = rowB.getValue(columnId);
      
      // Sort active before disabled
      if (statusA === statusB) return 0;
      return statusA === 'active' ? -1 : 1;
    },
  }),
];

// Define sample data for Person
export const samplePersonData: Person[] = [
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
    status: 'disabled',
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
    status: 'disabled',
  },
  {
    firstName: 'Michael',
    lastName: 'Brown',
    age: 28,
    visits: 8,
    status: 'active',
  },
  {
    firstName: 'Emily',
    lastName: 'Jones',
    age: 37,
    visits: 12,
    status: 'active',
  },
  {
    firstName: 'David',
    lastName: 'Miller',
    age: 42,
    visits: 7,
    status: 'disabled',
  },
  {
    firstName: 'Sarah',
    lastName: 'Davis',
    age: 29,
    visits: 18,
    status: 'active',
  },
  {
    firstName: 'James',
    lastName: 'Wilson',
    age: 33,
    visits: 9,
    status: 'disabled',
  },
  {
    firstName: 'Jennifer',
    lastName: 'Taylor',
    age: 31,
    visits: 14,
    status: 'active',
  },
];