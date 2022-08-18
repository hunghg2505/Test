import { Col, Divider, Row } from 'antd';
import React from 'react';

import Button from 'libraries/UI/Button';
import clsx from 'clsx';
import dayjs from 'dayjs';
import styles from './index.module.scss';
import { capitalizeFirstLetter } from 'utils/common.utils';
import useConsentManagementPermission from 'hooks/useConsentManagementPermission';

const ICON_EDIT = (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' fill='white'>
    <path
      d='M3.5 21H21.5'
      stroke='white'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M5.5 13.36V17H9.1586L19.5 6.65405L15.8476 3L5.5 13.36Z'
      fill='#CF2A2B'
      stroke='white'
      strokeWidth={2}
      strokeLinejoin='round'
    />
  </svg>
);

const ConsentInfo = ({ data, onClickEdit }: any) => {
  const { isHavePermissionEditConsent } = useConsentManagementPermission();

  return (
    <div className={styles.consentInfo}>
      <Row>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Consent Name<span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>{data?.name}</p>
        </Col>
        <Col xs={2}></Col>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Consent ID<span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>{data?.consentId}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Product ID<span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>{data?.product?.id}</p>
        </Col>
        <Col xs={2}></Col>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Application<span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>{data?.application?.name}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Service<span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>{data?.service?.name}</p>
        </Col>
        <Col xs={2}></Col>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Product Name<span className={styles.asterisk}>*</span>
          </p>
          <p className={clsx(styles.value, styles.leftSpace)}>{data?.product?.name}</p>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Status<span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>{capitalizeFirstLetter(data?.status?.name)}</p>
        </Col>
        <Col xs={2}></Col>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>Expiry Date</p>
          <p className={clsx(styles.value, styles.leftSpace)}>
            {data?.expireOn ? dayjs(data?.expireOn).format('DD/MM/YY') : 'N/A'}
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Title <span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>{data?.title}</p>
        </Col>
        <Col xs={2}></Col>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Version <span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>{data?.version}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={24} className={clsx(styles.info, styles.content)}>
          <p className={styles.label}>
            Content<span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value} style={{ lineHeight: 1.5 }}>
            {data?.content}
          </p>
        </Col>
      </Row>
      {isHavePermissionEditConsent && (
        <Row className={styles.flexend}>
          <Button onClick={onClickEdit} icon={ICON_EDIT} className={styles.editBtn}>
            Edit
          </Button>
        </Row>
      )}
    </div>
  );
};

export default ConsentInfo;
