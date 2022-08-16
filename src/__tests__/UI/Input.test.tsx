import React from 'react';
import { render } from '@testing-library/react';
import Input from 'libraries/UI/Input';

test('Test component input without crash', () => {
  render(<Input />);
});

test('Test component input with textarea', () => {
  const { container } = render(<Input type='textarea' />);

  const textarea = container.querySelector('textarea');
  expect(textarea).toBeInTheDocument();
});

test('Test component input with password', () => {
  const { container } = render(<Input type='password' />);

  const inputPassword = container.querySelector('input[type="password"]');
  expect(inputPassword).toBeInTheDocument();
});
