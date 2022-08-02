import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from 'libraries/UI/Button';

test('Test component button without crash', () => {
  const textButton = 'Click';
  render(<Button>{textButton}</Button>);
  const pElement = screen.getByText(/Click/i);
  expect(pElement).toBeInTheDocument();
});

test('Test component button with suffix icon', () => {
  const textButton = 'Click';
  const suffixIcon = 'Icon';
  render(<Button suffixIcon={suffixIcon}>{textButton}</Button>);

  const pElement = screen.getByText(/Icon/i);
  expect(pElement).toBeInTheDocument();
});

test('Test component button with type primary', () => {
  const textButton = 'Click';
  const { container } = render(<Button>{textButton}</Button>);

  expect(container.firstChild).toHaveClass('primary');
});

test('Test component button with type secondary', () => {
  const textButton = 'Click';
  const { container } = render(<Button type='secondary'>{textButton}</Button>);

  expect(container.firstChild).toHaveClass('secondary');
});

test('Test component button with text align center', () => {
  const textButton = 'Click';
  const { container } = render(<Button>{textButton}</Button>);

  expect(container.firstChild).toHaveClass('center');
});

test('Test component button with text size small', () => {
  const textButton = 'Click';
  const { container } = render(<Button>{textButton}</Button>);

  expect(container.firstChild).toHaveClass('small');
});

test('Test component button with button disabled', () => {
  const textButton = 'Click';
  const { container } = render(<Button disabled>{textButton}</Button>);

  expect(container.firstChild).toHaveClass('disabled');
});

test('Test component button with button has className', () => {
  const textButton = 'Click';
  const { container } = render(<Button className='btnTest'>{textButton}</Button>);

  expect(container.firstChild).toHaveClass('btnTest');
});
