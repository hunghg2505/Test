import { Checkbox, Col, Row, Table } from 'antd';
import clsx from 'clsx';
import Button from 'libraries/UI/Button';
import React from 'react';
import { useAdminPermissions } from './service';

import { paginationItemRender } from 'libraries/UI/Pagination';
import styles from './index.module.scss';

export interface DataType {
  key: React.ReactNode;
  no: string;
  roles: string;
  description: string;
  action: string;
  listRoles?: [];
}

const columns: any = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
    width: 110,
  },
  {
    title: 'Roles',
    dataIndex: 'roles',
    key: 'roles',
    width: 110,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Actions',
    dataIndex: 'action',
    key: 'action',
    render: () => (
      <Row justify='center'>
        <Button>Edit</Button>
      </Row>
    ),
    width: 50,
  },
  Table.EXPAND_COLUMN,
];

const customExpandIcon = ({ expanded, onExpand, record }: any) =>
  expanded ? (
    <div onClick={(e) => onExpand(record, e)}>
      <svg xmlns='http://www.w3.org/2000/svg' width={15} height={9} viewBox='0 0 15 9' fill='none'>
        <path
          d='M13.5 7.5127L7.5 1.5127L1.5 7.5127'
          stroke='#202225'
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  ) : (
    <div onClick={(e) => onExpand(record, e)}>
      <svg xmlns='http://www.w3.org/2000/svg' width={15} height={9} viewBox='0 0 15 9' fill='none'>
        <path
          d='M13.5 1.5127L7.5 7.5127L1.5 1.5127'
          stroke='#BDBDBD'
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  );

const getExpandRowRender = (record: any) => (
  <div className={styles.rolesDetail}>
    {record?.listRoles?.map((role: any) => {
      return (
        <div key={`${record.key}${role?.id}`}>
          <Row className={styles.title}>
            <Col span={4}>Permission</Col>
            <Col span={5}>Profile</Col>
            <Col span={5}>DSM</Col>
            <Col span={5}>Case</Col>
            <Col span={5}>Consent</Col>
          </Row>
          <Row className={styles.checkbox}>
            <Col span={4}></Col>
            <Col span={5}>
              <Checkbox />
            </Col>
            <Col span={5}>
              <Checkbox />
            </Col>
            <Col span={5}>
              <Checkbox />
            </Col>
            <Col span={5}>
              <Checkbox />
            </Col>
          </Row>
        </div>
      );
    })}
  </div>
);

const AdminPermissions = () => {
  const { data, loading, onChange } = useAdminPermissions();

  return (
    <>
      <Row justify='end' align='middle' gutter={[16, 0]}>
        <Col>
          <Button>Create Role</Button>
        </Col>

        <Col>
          <Button typeDisplay='ghost'>Cretea Group</Button>
        </Col>
      </Row>

      <div
        className={clsx(styles.usersContent, {
          [styles.usersContentEmpty]: !loading && !data?.list?.length,
        })}
      >
        <Table
          className={styles.table}
          columns={columns}
          dataSource={data?.list}
          loading={loading}
          expandable={{
            expandedRowRender: getExpandRowRender,
            expandIcon: customExpandIcon,
          }}
          pagination={{
            current: data?.current,
            total: data?.list?.length,
            onChange,
            itemRender: paginationItemRender,
          }}
        />
      </div>
    </>
  );
};

export default AdminPermissions;
