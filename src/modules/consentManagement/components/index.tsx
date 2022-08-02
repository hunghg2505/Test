import { Form, Row, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import InputForm from 'libraries/form/input/input-form';
import ContainerLayout from 'libraries/layouts/container.layout';

import { useConsentManagement } from './utils/service';

import IconCross from 'assets/icons/icon-cross';
import IconSearch from 'assets/icons/icon-search';
import clsx from 'clsx';
import Button from 'libraries/UI/Button';
import { paginationItemRender } from 'libraries/UI/Pagination';
import { useRef, useState } from 'react';
import CreateConsentForm from './CreateConsentForm';
import styles from './index.module.scss';
import ModalSearchAdvance from './ModalSearchAdvance';
import SuggestListUsers from 'modules/dataSubjectManagement/components/SuggestListUsers';
import { useClickAway } from 'ahooks';
import useConsentManagementPermission from 'hooks/useConsentManagementPermission';

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
    dataIndex: 'id',
    key: 'id',
    width: 110,
  },
  {
    title: 'Consent Name',
    dataIndex: 'name',
    key: 'name',
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
    dataIndex: 'version',
    key: 'consentVersion',
    width: 100,
  },
  {
    title: 'Consent Content',
    dataIndex: 'content',
    key: 'description',
    width: 546,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'Status',
    width: 110,
  },
  {
    title: 'Created Date',
    dataIndex: 'createdDate',
    key: 'createdAt',
    width: 170,
  },
  {
    title: 'Updated Date',
    dataIndex: 'updatedDate',
    key: 'updatedAt',
    width: 170,
  },
  {
    title: 'Action',
    key: 'id',
    dataIndex: 'id',
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
  const refListUsers: any = useRef();
  const refForm: any = useRef();
  const { isHavePermissionCreateConsent } = useConsentManagementPermission();

  const {
    data,
    loading,
    onChangePage,
    onSearchConsent,
    onReloadConsentData,
    applications,
    reqSearchApplicationSuggestion,
    onSearchApplicationSuggestionDebounce,
    onLoadMoreApplications,
    onResetApplication,
  } = useConsentManagement();

  const [isOpenCreateConsentForm, setIsOpenCreateConsentForm] = useState(false);

  useClickAway(() => {
    if (refListUsers.current?.closeListUser) {
      refListUsers.current.closeListUser();
      onResetApplication();
    }
  }, refForm);

  const onFinish = (values: any) => {
    onSearchConsent({ ...values, isEqualSearch: false, type: 'enter' }, () => {
      if (refListUsers.current?.closeListUser) {
        refListUsers.current.closeListUser();
        onResetApplication();
      }
    });
  };

  const onFieldsChange = (values: any) => {
    if (values?.length < 3) refListUsers.current.closeListUser();
    onSearchApplicationSuggestionDebounce(values, () => {
      if (refListUsers.current?.openListUser) refListUsers.current.openListUser();
    });
  };

  return (
    <ContainerLayout title='Consent Management'>
      <div className={styles.consentPage}>
        <Row justify='center' align='middle' className={styles.consentHeader}>
          <Form onFinish={onFinish} onFieldsChange={onFieldsChange}>
            <div ref={refForm} className={styles.formSearchWrap}>
              <Row justify='center' align='middle' className={styles.searchForm}>
                <IconSearch />

                <InputForm
                  name='appName'
                  placeholder='Search Application'
                  className={styles.inputSearch}
                  classNameFormInput={styles.inputSearchForm}
                  maxLength={55}
                  rules={[
                    {
                      min: 3,
                      message: t('messages.errors.min', { min: 3 }),
                    },
                  ]}
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
              <SuggestListUsers
                data={reqSearchApplicationSuggestion.data}
                loading={reqSearchApplicationSuggestion.loading}
                onSearchDataSubject={(item: any) => {
                  onSearchConsent({
                    appName: item?.firstname,
                    isEqualSearch: true,
                  });
                }}
                ref={refListUsers}
                users={applications}
                onLoadMoreUsers={onLoadMoreApplications}
                onResetUsers={onResetApplication}
              />
            </div>
          </Form>

          <div className={styles.consentActions}>
            <ModalSearchAdvance onSearchConsent={onSearchConsent}></ModalSearchAdvance>
          </div>

          {isHavePermissionCreateConsent && (
            <Button
              typeDisplay='ghost'
              className={styles.btnCreateConsent}
              icon={ICON_CONSENT_PLUS}
              onClick={() => setIsOpenCreateConsentForm(true)}
            >
              {t('create_consent')}
            </Button>
          )}
        </Row>

        <div
          className={clsx(styles.userPermissions, {
            [styles.userPermissionsEmpty]: !loading && !data?.list?.length,
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
      <CreateConsentForm
        visible={isOpenCreateConsentForm}
        onClose={() => setIsOpenCreateConsentForm(false)}
        onReloadConsentData={onReloadConsentData}
      />
    </ContainerLayout>
  );
}

export default ConsentManagement;
