import React from 'react';
import { render } from '@testing-library/react';
import InputForm from 'libraries/form/input/input-form';
import { Form } from 'antd';
import InputPasswordForm from 'libraries/form/input/input-password-form';
import InputTextAreaForm from 'libraries/form/input/input-textarea-form';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

test('Test InputForm without crash', () => {
  const { container } = render(
    <Form>
      <InputForm name='first' />
    </Form>,
  );

  const inputText = container.querySelector('input[id="first"]');
  expect(inputText).toBeInTheDocument();
});

test('Test Input Password without crash', () => {
  const { container } = render(
    <Form>
      <InputPasswordForm name='first' />
    </Form>,
  );

  const inputText = container.querySelector('input[id="first"]');
  expect(inputText).toBeInTheDocument();
});

test('Test Input Textarea without crash', () => {
  const { container } = render(
    <Form>
      <InputTextAreaForm name='first' />
    </Form>,
  );

  const inputText = container.querySelector('textarea[id="first"]');
  expect(inputText).toBeInTheDocument();
});

test('Test Input Textarea without crash', () => {
  const { container } = render(
    <Form>
      <InputTextAreaForm name='first' uploadFile defaultFileUrl='host/commen-file/hello.txt' />
    </Form>,
  );

  const inputText = container.querySelector('input[type="file"]');
  expect(inputText).toBeInTheDocument();
});
