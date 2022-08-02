import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from 'libraries/UI/Button';

test('renders component button', () => {
  render(<Button>Button</Button>);

  // expect(linkElement).toBeInTheDocument();
});
