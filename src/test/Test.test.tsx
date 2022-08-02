import React from 'react';
import { render, screen } from '@testing-library/react';
import Test from '../Test';

test('renders learn react link', () => {
  render(<Test />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
