import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Row, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import IconDelete from 'assets/icons/icon-delete';
import IconEdit from 'assets/icons/icon-edit';
import clsx from 'clsx';
import useSystemConfigPermission from 'hooks/useSystemConfigPermission';
import { paginationItemRender } from 'libraries/UI/Pagination';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useDeleteCompany } from '../../utils/services';
import FormCompany from '../FormCompany';

import styles from './index.module.scss';

const { confirm } = Modal;

export interface DataType {
  id: any;
  addressEN: string;
  addressTH: string;
  nameEN: string;
  nameTH: string;
  email: string;
  createdAt: string;
}

const TableCompany = ({ data, onChangePage, loading, onReloadCompanyData }: any) => {
  const { t } = useTranslation();
  const { isHavePermissionEditSystem, isHavePermissionDeleteSystem } = useSystemConfigPermission();
  const deleteCompanyReq = useDeleteCompany(onReloadCompanyData);

  const showConfirm = useCallback((record: any) => {
    confirm({
      title: 'Confirm Delete',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      content: `Are you sure you want to delete company ${record?.nameEN}?`,
      okText: 'Yes',
      cancelText: 'No',
      okType: 'danger',
      okButtonProps: {
        className: styles.deleteBtn,
      },
      cancelButtonProps: {
        className: styles.btnCancel,
      },
      onOk() {
        deleteCompanyReq.run({ id: record.id });
      },
    });
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Company Name EN',
      dataIndex: 'nameEN',
      key: 'nameEN',
      ellipsis: true,
    },
    {
      title: 'Company Name TH',
      dataIndex: 'nameTH',
      key: 'nameTH',
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Company Address EN',
      dataIndex: 'addressEN',
      key: 'addressEN',
      ellipsis: true,
    },
    {
      title: 'Company Address TH',
      dataIndex: 'addressTH',
      key: 'addressTH',
      ellipsis: true,
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      width: 190,
      render: (_, record) => (
        <Row
          justify='center'
          align='middle'
          style={{ flexFlow: 'nowrap' }}
          className={styles.action}
        >
          {isHavePermissionDeleteSystem && (
            <span className={styles.btnDelete} onClick={() => showConfirm(record)}>
              <IconDelete />
            </span>
          )}
          {isHavePermissionEditSystem && (
            <FormCompany
              onReloadCompanyData={onReloadCompanyData}
              initialValues={{
                id: record?.id,
                nameEN: record?.nameEN || '',
                nameTH: record?.nameTH || '',
                email: record?.email || '',
                addressEN: record?.addressEN || '',
                addressTH: record?.addressTH || '',
              }}
            >
              <span className={styles.btnEdit}>
                <IconEdit colorStroke='#828282' colorFill='white' />
              </span>
            </FormCompany>
          )}
          <Link
            to={`/system-configuration/connection-configuration/${
              record?.id
            }?q=${encodeURIComponent(record?.nameEN)}`}
          >
            Detail
          </Link>
        </Row>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div
        className={clsx(styles.companyContent, {
          [styles.companyContentEmpty]: !loading && !data?.data?.length,
        })}
      >
        {data?.data?.length === 0 ? (
          <p className={styles.noResultText}>{t('no_result_found')}</p>
        ) : (
          <Table
            rowKey={'id'}
            className={styles.table}
            columns={columns}
            dataSource={data?.data}
            loading={loading}
            pagination={{
              current: data?.current,
              total: data?.total,
              showSizeChanger: false,
              onChange: onChangePage,
              itemRender: paginationItemRender,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TableCompany;
