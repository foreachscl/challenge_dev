import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExpensiveList from './ExpensiveList';

// MOCKEAMOS la función
jest.mock('./calculateTotal', () => ({
  calculateTotal: jest.fn((items) => items.reduce((acc, item) => acc + item.price, 0)),
}));

import { calculateTotal } from './calculateTotal';

const items = [
  { id: 1, name: 'Apple', price: 1 },
  { id: 2, name: 'Banana', price: 2 },
  { id: 3, name: 'Cherry', price: 3 },
];

beforeEach(() => {
  calculateTotal.mockClear();
});

test('should render a list of items', () => {
  render(<ExpensiveList items={items} />);
  expect(screen.getByText(/Apple/)).toBeInTheDocument();
  expect(screen.getByText(/Banana/)).toBeInTheDocument();
  expect(screen.getByText(/Cherry/)).toBeInTheDocument();
});

test('should filter the list of items and update total', () => {
  render(<ExpensiveList items={items} />);
  fireEvent.change(screen.getByPlaceholderText('Filtrar por nombre'), {
    target: { value: 'a' },
  });
  expect(screen.getByText(/Apple/)).toBeInTheDocument();
  expect(screen.getByText(/Banana/)).toBeInTheDocument();
  expect(screen.queryByText(/Cherry/)).not.toBeInTheDocument();
  expect(screen.getByText(/Total: \$3/)).toBeInTheDocument();
});

test('should calculate the total price', () => {
  render(<ExpensiveList items={items} />);
  expect(screen.getByText(/Total: \$6/)).toBeInTheDocument();
  // Se debe llamar a calculateTotal una vez al montar
  expect(calculateTotal).toHaveBeenCalledTimes(1);
});

test('should not recalculate total if unrelated re-render', () => {
  render(<ExpensiveList items={items} />);
  expect(calculateTotal).toHaveBeenCalledTimes(1);

  // Simula un re-render sin cambiar el filtro ni los items
  fireEvent.change(screen.getByPlaceholderText('Filtrar por nombre'), {
    target: { value: '' },
  });
  // Debería seguir llamándose una sola vez (no recalcula)
  expect(calculateTotal).toHaveBeenCalledTimes(1);
});

test('should recalculate total only when filter changes', () => {
  render(<ExpensiveList items={items} />);
  expect(calculateTotal).toHaveBeenCalledTimes(1);

  // Cambia el filtro
  fireEvent.change(screen.getByPlaceholderText('Filtrar por nombre'), {
    target: { value: 'a' },
  });
  // Se debe llamar una vez más
  expect(calculateTotal).toHaveBeenCalledTimes(2);

  // Vuelve a cambiar el filtro
  fireEvent.change(screen.getByPlaceholderText('Filtrar por nombre'), {
    target: { value: 'ap' },
  });
  expect(calculateTotal).toHaveBeenCalledTimes(3);
});