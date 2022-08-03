import { render } from '@testing-library/react';
import Loading from 'libraries/components/loading';

describe('Test Loading', () => {
  it('should render', () => {
    const { container } = render(<Loading />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
