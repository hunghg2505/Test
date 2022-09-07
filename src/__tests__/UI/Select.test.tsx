import { render } from '@testing-library/react';
import Select from 'libraries/UI/Select';

describe('Test Select', () => {
  it('should render', () => {
    const { container } = render(
      <Select className='Select'>
        <Select.Option value={1}>Option 1</Select.Option>
        <Select.Option value={2}>Option 2</Select.Option>
        <Select.Option value={3}>Option 3</Select.Option>
      </Select>,
    );
    const SelectEl = container.querySelector('.Select');

    expect(SelectEl).toBeInTheDocument();
  });
});
