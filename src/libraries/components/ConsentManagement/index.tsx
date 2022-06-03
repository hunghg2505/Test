import { Form, Row, Table } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { ColumnsType } from 'antd/lib/table';

import ButtonForm from 'libraries/form/button/button-form';
import InputForm from 'libraries/form/input/input-form';
import ContainerLayout from 'libraries/layouts/container.layout';

import { useConsentManagement } from './utils/service';

import styles from './index.module.scss';
import clsx from 'clsx';
import CustomPagination from '../CustomPagination';
import IconSearch from 'assets/icons/icon-search';

const ICON_ACTIONS = (
  <svg xmlns="http://www.w3.org/2000/svg" width={50} height={42} viewBox="0 0 50 42" fill="none">
    <rect width="49.9245" height={42} rx={10} fill="black" />
    <path
      d="M22.1891 9.50928H13.8684C13.1552 9.50928 12.6797 9.98475 12.6797 10.698V19.0187C12.6797 19.7319 13.1552 20.2074 13.8684 20.2074H22.1891C22.9023 20.2074 23.3778 19.7319 23.3778 19.0187V10.698C23.3778 9.98475 22.9023 9.50928 22.1891 9.50928ZM22.1891 22.5848H13.8684C13.1552 22.5848 12.6797 23.0602 12.6797 23.7734V32.0942C12.6797 32.8074 13.1552 33.2829 13.8684 33.2829H22.1891C22.9023 33.2829 23.3778 32.8074 23.3778 32.0942V23.7734C23.3778 23.0602 22.9023 22.5848 22.1891 22.5848ZM35.2646 9.50928H26.9438C26.2306 9.50928 25.7552 9.98475 25.7552 10.698V19.0187C25.7552 19.7319 26.2306 20.2074 26.9438 20.2074H35.2646C35.9778 20.2074 36.4533 19.7319 36.4533 19.0187V10.698C36.4533 9.98475 35.9778 9.50928 35.2646 9.50928ZM35.2646 22.5848H26.9438C26.2306 22.5848 25.7552 23.0602 25.7552 23.7734V32.0942C25.7552 32.8074 26.2306 33.2829 26.9438 33.2829H35.2646C35.9778 33.2829 36.4533 32.8074 36.4533 32.0942V23.7734C36.4533 23.0602 35.9778 22.5848 35.2646 22.5848Z"
      fill="white"
    />
  </svg>
);

const ICON_CONSENT_PLUS = (
  <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 28 28" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.5 0.5H24.5C26.15 0.5 27.5 1.85 27.5 3.5V24.5C27.5 26.15 26.15 27.5 24.5 27.5H3.5C1.835 27.5 0.5 26.15 0.5 24.5V3.5C0.5 1.85 1.835 0.5 3.5 0.5ZM15.5 15.5H21.5V12.5H15.5V6.5H12.5V12.5H6.5V15.5H12.5V21.5H15.5V15.5Z"
      fill="black"
      fillOpacity="0.54"
    />
  </svg>
);

const ICON_EDIT = (
  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={31} viewBox="0 0 30 31" fill="none">
    <path
      d="M30 7.86002C30.0012 7.66261 29.9633 7.46692 29.8887 7.28417C29.814 7.10141 29.704 6.93519 29.565 6.79503L23.205 0.435025C23.0649 0.296003 22.8986 0.186015 22.7159 0.111368C22.5331 0.0367213 22.3374 -0.00111627 22.14 2.50714e-05C21.9426 -0.00111627 21.7469 0.0367213 21.5642 0.111368C21.3814 0.186015 21.2152 0.296003 21.075 0.435025L16.83 4.68003L0.435025 21.075C0.296003 21.2152 0.186015 21.3814 0.111368 21.5642C0.0367213 21.7469 -0.00111627 21.9426 2.50714e-05 22.14V28.5C2.50714e-05 28.8979 0.15806 29.2794 0.439365 29.5607C0.720669 29.842 1.1022 30 1.50003 30H7.86002C8.06992 30.0114 8.27986 29.9786 8.47625 29.9037C8.67264 29.8287 8.85109 29.7134 9.00002 29.565L25.305 13.17L29.565 9.00002C29.7019 8.85465 29.8135 8.68732 29.895 8.50502C29.9095 8.38546 29.9095 8.26459 29.895 8.14503C29.902 8.0752 29.902 8.00485 29.895 7.93503L30 7.86002ZM7.24502 27H3.00003V22.755L17.895 7.86002L22.14 12.105L7.24502 27ZM24.255 9.99002L20.01 5.74502L22.14 3.63003L26.37 7.86002L24.255 9.99002Z"
      fill="#757575"
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
    width: 110
  },
  {
    title: 'App ID',
    dataIndex: 'appId',
    key: 'appId',
    width: 110
  },
  {
    title: 'App Name',
    dataIndex: 'appName',
    key: 'appName',
    width: 283
  },
  {
    title: 'Consent Version',
    dataIndex: 'consentVersion',
    key: 'consentVersion',
    width: 164
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    width: 482
  },
  {
    title: (
      <>
        <div>Create Date</div>
        <div>(dd/mm/yyyy)</div>
      </>
    ),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 170
  },
  {
    title: (
      <>
        <div>Update Date</div>
        <div>(dd/mm/yyyy)</div>
      </>
    ),
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 170
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    render: (_, { action }) => (
      <Row justify="space-between" align="middle" style={{ flexFlow: 'nowrap' }}>
        <div>{ICON_CONSENT_PLUS}</div>
        <Link to={`/consent/${action}`}>{ICON_EDIT}</Link>
      </Row>
    ),
    width: 105
  }
];

function ConsentManagement() {
  const { t } = useTranslation();

  const { data, loading, onNext, onPrev, onSearchConsent } = useConsentManagement();

  return (
    <ContainerLayout title="Consent Management">
      <div className={styles.consentPage}>
        <Row justify="center" align="middle" className={styles.consentHeader}>
          <Form onFinish={onSearchConsent}>
            <Row justify="center" align="middle" className={styles.searchForm}>
              <IconSearch />

              <InputForm
                name="search_consent"
                placeholder="Search Consent ID"
                className={styles.inputSearch}
                classNameFormInput={styles.inputSearchForm}
              />

              <ButtonForm
                title={t('Search')}
                htmlType="submit"
                buttonType="dark"
                borderRadius={5}
                className={styles.btnSearchConsent}
              />
            </Row>
          </Form>

          <div className={styles.consentActions}>{ICON_ACTIONS}</div>

          <div className={styles.btnCreateConsent}>
            <Link to={'/consent/new'}>{t('create_consent')}</Link>
          </div>
        </Row>

        <div
          className={clsx(styles.consentContent, {
            [styles.consentContentEmpty]: !loading && !data?.list?.length
          })}>
          <Table
            className={styles.table}
            columns={columns}
            dataSource={data?.data}
            pagination={false}
            loading={loading}
          />

          {!loading && data?.data?.length ? (
            <CustomPagination
              current={data.current}
              totalPage={data.total}
              onNext={onNext}
              onPrev={onPrev}
            />
          ) : null}
        </div>
      </div>
    </ContainerLayout>
  );
}

export default ConsentManagement;
