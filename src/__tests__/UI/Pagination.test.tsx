import { render } from '@testing-library/react';
import { Pagination } from 'antd';
import { paginationItemRender } from 'libraries/UI/Pagination';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

describe('Test PaginationItemRender', () => {
  it('should render', () => {
    const onChange = jest.fn();

    const { container } = render(
      <Pagination
        current={1}
        onChange={onChange}
        total={10}
        defaultPageSize={10}
        itemRender={paginationItemRender}
        showSizeChanger={false}
      />,
    );
    const btnPrev = container.querySelector('.btn-prev');
    const btnNext = container.querySelector('.btn-next');

    expect(btnPrev).toBeInTheDocument();
    expect(btnNext).toBeInTheDocument();
  });
});
