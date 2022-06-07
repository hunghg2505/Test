import { Row, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import clsx from 'clsx';
import Button from 'libraries/UI/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
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
    title: 'No.',
    dataIndex: 'noId',
    key: 'noId',
    width: 160
  },
  {
    title: 'Request Date',
    dataIndex: 'requestDate',
    key: 'requestDate',
    width: 264
  },
  {
    title: 'Data Request',
    dataIndex: 'dataRequest',
    key: 'dataRequest',
    width: 785
  },
  {
    title: 'Request Type',
    dataIndex: 'requestType',
    key: 'requestType',
    width: 192
  },
  {
    title: 'Request Status',
    dataIndex: 'requestStatus',
    key: 'requestStatus',
    width: 193
  }
];

const ICON_GRID = (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
    <path
      d="M21 14H14V21H21V14Z"
      stroke="#092C4C"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 14H3V21H10V14Z"
      stroke="#092C4C"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 3H14V10H21V3Z"
      stroke="#092C4C"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 3H3V10H10V3Z"
      stroke="#092C4C"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function DataSubjectHistory() {
  const { data, loading, onChange } = useDataSubjectHistory();

  return (
    <div className={styles.dsHistoryWrap}>
      <Row justify="space-between" align="middle" className={styles.header}>
        <div>Data Subject History</div>
        <div className={styles.btnSeeMore}>{ICON_GRID}</div>
      </Row>
      <div
        className={clsx(styles.dataSubjectContent, {
          [styles.dataSubjectContentEmpty]: !loading && !data?.list?.length
        })}>
        <Table
          className={styles.table}
          columns={columns}
          dataSource={data?.data}
          pagination={{
            current: data?.current,
            total: data?.list?.length,
            onChange
          }}
          loading={loading}
        />
      </div>
      <Button type="secondary" className={styles.btnForgotMe}>
        Forgot Me
      </Button>
    </div>
  );
}

export default DataSubjectHistory;
