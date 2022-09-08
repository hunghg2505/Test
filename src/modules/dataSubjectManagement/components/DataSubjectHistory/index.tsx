import { Row, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import clsx from 'clsx';
import { paginationItemRender } from 'libraries/UI/Pagination';
import { forwardRef, useImperativeHandle } from 'react';
import styles from './index.module.scss';
import { useDataSubjectHistory } from './service';

export interface DataType {
  key: string;
  noId: string;
  requestDate: string;
  dataRequest: string;
  requestType: string;
  requestStatus: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'noId',
    key: 'noId',
    width: 160,
  },
  {
    title: 'Request Date',
    dataIndex: 'requestDate',
    key: 'requestDate',
    width: 264,
  },
  {
    title: 'Data Request',
    dataIndex: 'dataRequest',
    key: 'dataRequest',
    width: 785,
    render(value) {
      return (
        <Row
          justify='center'
          align='middle'
          style={{ flexFlow: 'nowrap' }}
          className={styles.action}
        >
          {value?.length > 30 ? (
            <Tooltip title={value}>
              <span>{`${value?.slice(0, 30)}...`}</span>
            </Tooltip>
          ) : (
            value
          )}
        </Row>
      );
    },
  },
  {
    title: 'Request Type',
    dataIndex: 'requestType',
    key: 'requestType',
    width: 192,
  },
  {
    title: 'Request Status',
    dataIndex: 'requestStatus',
    key: 'requestStatus',
    width: 193,
  },
];

const ICON_GRID = (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' fill='none'>
    <path
      d='M21 14H14V21H21V14Z'
      stroke='#092C4C'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M10 14H3V21H10V14Z'
      stroke='#092C4C'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M21 3H14V10H21V3Z'
      stroke='#092C4C'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M10 3H3V10H10V3Z'
      stroke='#092C4C'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

function DataSubjectHistory(
  {
    userId,
    onlyView,
    applicationName,
  }: { userId: string; idNo: string; onlyView?: boolean; applicationName?: any },
  ref: any,
) {
  const { data, loading, onChange, subjectHistoryData, refresh } = useDataSubjectHistory({
    userId,
    application: applicationName,
    onlyView,
  });

  useImperativeHandle(ref, () => {
    return {
      refreshDataHistory: refresh,
    };
  });

  if (!applicationName) {
    return null;
  }

  return (
    <div className={styles.dsHistoryWrap}>
      <Row justify='space-between' align='middle' className={styles.header}>
        <div>Data Subject History</div>
        <div className={styles.btnSeeMore}>{ICON_GRID}</div>
      </Row>
      <div
        className={clsx(styles.dataSubjectContent, {
          [styles.dataSubjectContentEmpty]: !loading && !data?.data?.length,
        })}
      >
        <Table
          className={styles.table}
          columns={columns}
          dataSource={subjectHistoryData}
          loading={loading}
          pagination={{
            current: data?.current,
            total: data?.total,
            onChange,
            itemRender: paginationItemRender,
            showSizeChanger: false,
          }}
        />
      </div>

      {/* <Button
        type="secondary"
        className={styles.btnForgotMe}
        onClick={showConfirm}
        loading={reqForgotMe.loading}>
        Forget Me
      </Button> */}
    </div>
  );
}

export default forwardRef(DataSubjectHistory);
