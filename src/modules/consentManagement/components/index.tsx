import { Form, Row, Table } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/lib/table';

import ButtonForm from 'libraries/form/button/button-form';
import InputForm from 'libraries/form/input/input-form';
import ContainerLayout from 'libraries/layouts/container.layout';

import { useConsentManagement } from './utils/service';

import styles from './index.module.scss';
import clsx from 'clsx';
import IconSearch from 'assets/icons/icon-search';
import { paginationItemRender } from 'libraries/UI/Pagination';
import IconCross2 from 'assets/icons/icon-cross2';
import IconCross from 'assets/icons/icon-cross';
import Button from 'libraries/UI/Button';
import { useState } from 'react';
import CreateConsentForm from './CreateConsentForm';

const ICON_CONSENT_PLUS = (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' fill='none'>
    <path
      d='M12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22Z'
      stroke='#CF2A2B'
      strokeWidth={2}
      strokeLinejoin='round'
    />
    <path
      d='M12 8V16'
      stroke='#CF2A2B'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M8 12H16'
      stroke='#CF2A2B'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const ICON_EDIT = (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' fill='none'>
    <path
      d='M3.5 21H21.5'
      stroke='#000'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M5.5 13.36V17H9.1586L19.5 6.65405L15.8476 3L5.5 13.36Z'
      fill='white'
      stroke='#000'
      strokeWidth={2}
      strokeLinejoin='round'
    />
  </svg>
);

export interface DataType {
  key: string;
  consentId: string;
  appId: string;
  appName: string;
  consentVersion: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  action: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Consent ID',
    dataIndex: 'consentId',
    key: 'consentId',
    width: 110,
  },
  {
    title: 'App ID',
    dataIndex: 'appId',
    key: 'appId',
    width: 110,
  },
  {
    title: 'Application Name',
    dataIndex: 'appName',
    key: 'appName',
    width: 283,
  },
  {
    title: 'Consent Version',
    dataIndex: 'consentVersion',
    key: 'consentVersion',
    width: 164,
  },
  {
    title: 'Consent Content',
    dataIndex: 'description',
    key: 'description',
    width: 482,
  },
  {
    title: 'Created Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 170,
  },
  {
    title: 'Update Date',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 170,
  },
  {
    title: 'Action',
    key: 'id',
    dataIndex: 'consentId',
    render: (value) => (
      <Row justify='center' align='middle' style={{ flexFlow: 'nowrap' }} className={styles.action}>
        <Link to={`/consent/${value}`}>Detail</Link>
      </Row>
    ),
    width: 178,
  },
];

function ConsentManagement() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data, loading, onChange, onSearchConsent } = useConsentManagement();

  const [isOpenCreateConsentForm, setIsOpenCreateConsentForm] = useState(false);

  return (
    <ContainerLayout title='Consent Management'>
      <div className={styles.consentPage}>
        <Row justify='center' align='middle' className={styles.consentHeader}>
          <Form onFinish={onSearchConsent}>
            <Row justify='center' align='middle' className={styles.searchForm}>
              <IconSearch />

              <InputForm
                name='search_consent'
                placeholder='Search Consent ID'
                className={styles.inputSearch}
                classNameFormInput={styles.inputSearchForm}
              />

              <Button
                icon={<IconSearch />}
                className={styles.btnSearchConsent}
                htmlType='submit'
                type='secondary'
              >
                {t('Search')}
              </Button>
            </Row>
          </Form>

          <div className={styles.consentActions}>
            <IconCross />
          </div>

          <Button
            typeDisplay='ghost'
            className={styles.btnCreateConsent}
            icon={ICON_CONSENT_PLUS}
            onClick={() => setIsOpenCreateConsentForm(true)}
          >
            {t('create_consent')}
          </Button>
        </Row>

        <div
          className={clsx(styles.userPermissions, {
            [styles.userPermissionsEmpty]: !loading && !data?.list?.length,
          })}
        >
          <Table
            className={styles.table}
            columns={columns}
            dataSource={data?.data}
            loading={loading}
            pagination={{
              current: data?.current,
              total: data?.list?.length,
              onChange,
              itemRender: paginationItemRender,
            }}
          />
        </div>
      </div>
      <CreateConsentForm
        visible={isOpenCreateConsentForm}
        onClose={() => setIsOpenCreateConsentForm(false)}
      />
    </ContainerLayout>
  );
}

export default ConsentManagement;
