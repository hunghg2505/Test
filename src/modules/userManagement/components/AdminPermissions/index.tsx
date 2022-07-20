import { Checkbox, Col, Row, Table } from 'antd';
import clsx from 'clsx';
import React from 'react';

import { paginationItemRender } from 'libraries/UI/Pagination';
import styles from './index.module.scss';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useUpdatePermissions } from './service';
import { useTranslation } from 'react-i18next';

export interface DataType {
  key: React.ReactNode;
  no: string;
  firstName: string;
  lastName: string;
  roleName: string;
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
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    width: 110,
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Role Name',
    dataIndex: 'roleName',
    key: 'roleName',
  },
  {
    title: 'Actions',
    render() {
      return null;
    },
    width: 80,
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

const getExpandRowRender = (record: any, reqUpdatePermissions: any) => {
  const onChange = (e: CheckboxChangeEvent, item: any) => {
    reqUpdatePermissions.run({
      permissionId: item?.permissionId,
      value: e.target.checked,
      evt: e,
      record,
    });
  };

  return (
    <div className={styles.rolesDetail}>
      <h4>Permission</h4>

      {record?.listRoles?.map((role: any, index: number) => {
        return (
          <div key={`${role.id}${index}}`}>
            <Row className={styles.title}>
              <Col span={4}>{role.permissionName}</Col>
              {role.listAction.map((item: any) => (
                <Col span={4} key={`${item?.id}`}>
                  {item?.actionName}
                </Col>
              ))}
            </Row>
            <Row className={styles.checkbox}>
              <Col span={4}></Col>
              {role.listAction.map((item: any, index: number) => (
                <Col span={4} key={`${item?.id}${index}`}>
                  <Checkbox
                    defaultChecked={item.permission}
                    onChange={(evt) => onChange(evt, item)}
                  />
                </Col>
              ))}
            </Row>
          </div>
        );
      })}
    </div>
  );
};

const AdminPermissions = ({
  data,
  loading,
  onChangePage,
}: {
  data: any;
  loading: boolean;
  onChangePage: any;
}) => {
  const reqUpdatePermissions = useUpdatePermissions();
  const { t } = useTranslation();

  return (
    <>
      {/* <Row justify='end' align='middle' gutter={[16, 0]}>
        <Col>
          <Button>Create Role</Button>
        </Col>

        <Col>
          <Button typeDisplay='ghost'>Cretea Group</Button>
        </Col>
      </Row> */}

      <div
        className={clsx(styles.usersContent, {
          [styles.usersContentEmpty]: !loading && !data?.data.length,
        })}
      >
        {data?.data?.length === 0 ? (
          <p className={styles.noResultText}>{t('no_result_found')}</p>
        ) : (
          <Table
            className={styles.table}
            columns={columns}
            dataSource={data?.data}
            loading={loading}
            expandable={{
              expandedRowRender: (record) => getExpandRowRender(record, reqUpdatePermissions),
              expandIcon: customExpandIcon,
            }}
            pagination={{
              current: data?.current,
              total: data?.total,
              onChange: onChangePage,
              itemRender: paginationItemRender,
            }}
          />
        )}
      </div>
      {/* {!!data?.data?.length && (
        <Row justify='start' align='middle' gutter={[16, 0]}>
          <Col>
            <Button>Save</Button>
          </Col>
        </Row>
      )} */}
    </>
  );
};

export default AdminPermissions;
