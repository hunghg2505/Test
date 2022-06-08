import { PaginationProps } from 'antd';

export const paginationItemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
  if (type === 'prev') {
    return (
      <div className="btn-prev">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={7}
          height={12}
          viewBox="0 0 7 12"
          fill="none">
          <path
            d="M6.69004 0.709999C7.08004 1.1 7.08004 1.73 6.69004 2.12L2.81004 6L6.69004 9.88C7.08004 10.27 7.08004 10.9 6.69004 11.29C6.30004 11.68 5.67004 11.68 5.28004 11.29L0.690044 6.7C0.300044 6.31 0.300044 5.68 0.690044 5.29L5.28004 0.699999C5.66004 0.319999 6.30004 0.319999 6.69004 0.709999Z"
            fill="#092C4C"
          />
        </svg>
      </div>
    );
  }
  if (type === 'next') {
    return (
      <div className="btn-next">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={7}
          height={12}
          viewBox="0 0 7 12"
          fill="none">
          <path
            d="M0.309956 11.29C-0.0800439 10.9 -0.0800439 10.27 0.309956 9.88L4.18996 6L0.309956 2.12C-0.0800439 1.73 -0.0800439 1.1 0.309956 0.71C0.699956 0.32 1.32996 0.32 1.71996 0.71L6.30996 5.3C6.69996 5.69 6.69996 6.32 6.30996 6.71L1.71996 11.3C1.33996 11.68 0.699956 11.68 0.309956 11.29Z"
            fill="#092C4C"
          />
        </svg>
      </div>
    );
  }
  return originalElement;
};
