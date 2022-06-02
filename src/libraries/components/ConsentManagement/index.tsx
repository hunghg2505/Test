import { Form, Row, Table } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { ColumnsType } from 'antd/lib/table';

import ButtonForm from 'libraries/form/button/button-form';
import InputForm from 'libraries/form/input/input-form';
import ContainerLayout from 'libraries/layouts/container.layout';
import Loading from '../loading';

import { useConsentManagement } from './utils/service';

import styles from './index.module.scss';
import clsx from 'clsx';

const ICON_SEARCH = (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
    <path
      d="M22.2734 17.6351L19.8584 15.1617C19.3389 14.6679 18.6837 14.3408 17.9768 14.2223C17.27 14.1038 16.5438 14.1993 15.8917 14.4967L14.8417 13.4467C16.079 11.7935 16.6441 9.73284 16.4232 7.6797C16.2023 5.62655 15.2118 3.73332 13.6511 2.38112C12.0904 1.02892 10.0753 0.31817 8.01166 0.391936C5.94798 0.465701 3.98886 1.31851 2.52868 2.77868C1.06851 4.23886 0.215701 6.19798 0.141936 8.26166C0.0681702 10.3253 0.778925 12.3404 2.13112 13.9011C3.48332 15.4618 5.37655 16.4523 7.4297 16.6732C9.48284 16.8941 11.5435 16.329 13.1967 15.0917L14.2351 16.1301C13.9027 16.783 13.7835 17.5237 13.8945 18.2479C14.0054 18.9721 14.3408 19.6432 14.8534 20.1667L17.3267 22.6401C17.983 23.2955 18.8726 23.6636 19.8001 23.6636C20.7276 23.6636 21.6171 23.2955 22.2734 22.6401C22.6067 22.3141 22.8716 21.9248 23.0525 21.4951C23.2333 21.0653 23.3265 20.6038 23.3265 20.1376C23.3265 19.6713 23.2333 19.2098 23.0525 18.78C22.8716 18.3503 22.6067 17.961 22.2734 17.6351ZM12.3801 12.6884C11.5637 13.5027 10.5242 14.0568 9.39308 14.2807C8.26193 14.5046 7.0898 14.3882 6.02476 13.9463C4.95971 13.5043 4.04954 12.7566 3.40922 11.7977C2.76889 10.8387 2.42715 9.71148 2.42715 8.55839C2.42715 7.40529 2.76889 6.27806 3.40922 5.31909C4.04954 4.36013 4.95971 3.61245 6.02476 3.1705C7.0898 2.72856 8.26193 2.61218 9.39308 2.83606C10.5242 3.05995 11.5637 3.61406 12.3801 4.42839C12.9233 4.97025 13.3543 5.61397 13.6484 6.32266C13.9424 7.03135 14.0938 7.7911 14.0938 8.55839C14.0938 9.32567 13.9424 10.0854 13.6484 10.7941C13.3543 11.5028 12.9233 12.1465 12.3801 12.6884ZM20.6284 20.9367C20.5199 21.0461 20.3909 21.1329 20.2487 21.1921C20.1066 21.2513 19.9541 21.2818 19.8001 21.2818C19.646 21.2818 19.4936 21.2513 19.3514 21.1921C19.2092 21.1329 19.0802 21.0461 18.9717 20.9367L16.4984 18.4634C16.389 18.3549 16.3022 18.2259 16.243 18.0837C16.1838 17.9416 16.1533 17.7891 16.1533 17.6351C16.1533 17.481 16.1838 17.3286 16.243 17.1864C16.3022 17.0442 16.389 16.9152 16.4984 16.8067C16.6068 16.6974 16.7359 16.6106 16.878 16.5513C17.0202 16.4921 17.1727 16.4616 17.3267 16.4616C17.4807 16.4616 17.6332 16.4921 17.7754 16.5513C17.9176 16.6106 18.0466 16.6974 18.1551 16.8067L20.6284 19.2801C20.7377 19.3885 20.8245 19.5175 20.8838 19.6597C20.943 19.8019 20.9735 19.9544 20.9735 20.1084C20.9735 20.2624 20.943 20.4149 20.8838 20.5571C20.8245 20.6992 20.7377 20.8283 20.6284 20.9367Z"
      fill="black"
    />
  </svg>
);

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

const CustomPagination = ({
  current,
  totalPage,
  onPrev,
  onNext
}: {
  current: number;
  totalPage: number;
  onPrev: (value: number) => void;
  onNext: (value: number) => void;
}) => {
  return (
    <Row className={styles.pagination} align="middle" justify="end">
      <div onClick={() => onPrev(current - 1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={14}
          height={22}
          viewBox="0 0 14 22"
          fill="none">
          <path
            d="M5.57964 10.9999L12.6596 3.9199C13.0321 3.54517 13.2412 3.03827 13.2412 2.5099C13.2412 1.98153 13.0321 1.47462 12.6596 1.0999C12.4737 0.912441 12.2525 0.763651 12.0088 0.662114C11.7651 0.560577 11.5037 0.508301 11.2396 0.508301C10.9756 0.508301 10.7142 0.560577 10.4705 0.662114C10.2268 0.763651 10.0056 0.912441 9.81964 1.0999L1.33964 9.5799C1.15219 9.76582 1.0034 9.98703 0.901861 10.2307C0.800324 10.4745 0.748047 10.7359 0.748047 10.9999C0.748047 11.2639 0.800324 11.5253 0.901861 11.7691C1.0034 12.0128 1.15219 12.234 1.33964 12.4199L9.81964 20.9999C10.0065 21.1853 10.2282 21.3319 10.4718 21.4314C10.7155 21.531 10.9764 21.5814 11.2396 21.5799C11.5029 21.5814 11.7638 21.531 12.0075 21.4314C12.2511 21.3319 12.4728 21.1853 12.6596 20.9999C13.0321 20.6252 13.2412 20.1183 13.2412 19.5899C13.2412 19.0615 13.0321 18.5546 12.6596 18.1799L5.57964 10.9999Z"
            fill="black"
          />
        </svg>
      </div>
      <div className={styles.paginationInfo}>
        Page {current}/{totalPage}
      </div>
      <div onClick={() => onNext(current + 1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="28"
          viewBox="0 0 16 28"
          fill="none">
          <path
            d="M15.0805 12.5801L3.76045 1.28007C3.57453 1.09262 3.35332 0.943828 3.10961 0.842291C2.86589 0.740754 2.60448 0.688477 2.34045 0.688477C2.07643 0.688477 1.81502 0.740754 1.5713 0.842291C1.32758 0.943828 1.10638 1.09262 0.920452 1.28007C0.54795 1.6548 0.338867 2.1617 0.338867 2.69007C0.338867 3.21844 0.54795 3.72535 0.920452 4.10007L10.8205 14.1001L0.920452 24.0001C0.54795 24.3748 0.338867 24.8817 0.338867 25.4101C0.338867 25.9384 0.54795 26.4453 0.920452 26.8201C1.10568 27.009 1.32657 27.1594 1.57032 27.2624C1.81407 27.3654 2.07584 27.419 2.34045 27.4201C2.60507 27.419 2.86683 27.3654 3.11058 27.2624C3.35433 27.1594 3.57522 27.009 3.76045 26.8201L15.0805 15.5201C15.2835 15.3328 15.4455 15.1055 15.5563 14.8525C15.6671 14.5995 15.7243 14.3263 15.7243 14.0501C15.7243 13.7739 15.6671 13.5007 15.5563 13.2477C15.4455 12.9947 15.2835 12.7674 15.0805 12.5801Z"
            fill="black"
          />
        </svg>
      </div>
    </Row>
  );
};

function ConsentManagement() {
  const { t } = useTranslation();

  const { data, loading, onNext, onPrev, onSearchConsent } = useConsentManagement();

  return (
    <ContainerLayout title="Consent Management">
      <div className={styles.consentPage}>
        <Row justify="center" align="middle" className={styles.consentHeader}>
          <Form onFinish={onSearchConsent}>
            <Row justify="center" align="middle" className={styles.searchForm}>
              {ICON_SEARCH}

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
