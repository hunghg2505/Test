import { Row } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import { paginationItemRender } from 'libraries/UI/Pagination';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from './index.module.scss';

export interface DataType {
  key: string;
  caseId: string;
  refId: string;
  dsName: string;
  description: string;
  assignTo: string;
  caseStatus: string;
  createdDate: string;
  action: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Case ID',
    dataIndex: 'caseId',
    key: 'caseId',
    width: 100,
  },
  {
    title: 'Ref. ID',
    dataIndex: 'refId',
    key: 'refId',
    width: 158,
  },
  {
    title: 'DS Name',
    dataIndex: 'dsName',
    key: 'dsName',
    width: 216,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    width: 400,
  },
  {
    title: 'Assign To',
    dataIndex: 'assignTo',
    key: 'assignTo',
    width: 185,
  },
  {
    title: 'Case Status',
    dataIndex: 'caseStatus',
    key: 'caseStatus',
    width: 204,
  },
  {
    title: 'Created Date',
    dataIndex: 'createdDate',
    key: 'createdDate',
    width: 206,
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    render: (_, { action }) => (
      <Row justify='center' align='middle' style={{ flexFlow: 'nowrap' }} className={styles.action}>
        <Link to={`/case-management/${action}`}>Detail</Link>
      </Row>
    ),
    width: 178,
  },
];

const CaseManagementTable = ({ data, loading, onChange }: any) => {
  const { t } = useTranslation();

  return (
    <>
      {data?.data?.length === 0 ? (
        <p className={styles.noResultText}>{t('no_result_found')}</p>
      ) : (
        <Table
          className={styles.table}
          columns={columns}
          dataSource={data?.data}
          loading={loading}
          pagination={{
            current: data?.current,
            total: data?.total,
            showSizeChanger: false,
            onChange,
            itemRender: paginationItemRender,
          }}
        />
      )}
    </>
  );
};

export default CaseManagementTable;
