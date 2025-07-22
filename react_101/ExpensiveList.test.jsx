import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExpensiveList from './ExpensiveList';

const items = [
  { id: 1, name: 'Apple', price: 1 },
  { id: 2, name: 'Banana', price: 2 },
  { id: 3, name: 'Cherry', price: 3 },
];

test('should render a list of items', () => {
  render(<ExpensiveList items={items} />);
  expect(screen.getByText(/Apple/)).toBeInTheDocument();
  expect(screen.getByText(/Banana/)).toBeInTheDocument();
  expect(screen.getByText(/Cherry/)).toBeInTheDocument();
});

test('should filter the list of items', () => {
  render(<ExpensiveList items={items} />);
  fireEvent.change(screen.getByPlaceholderText('Filtrar por nombre'), {
    target: { value: 'a' },
  });
  expect(screen.getByText(/Apple/)).toBeInTheDocument();
  expect(screen.getByText(/Banana/)).toBeInTheDocument();
  expect(screen.queryByText(/Cherry/)).not.toBeInTheDocument();
});

test('should calculate the total price', () => {
  render(<ExpensiveList items={items} />);
  expect(screen.getByText(/Total: \$6/)).toBeInTheDocument();
});
