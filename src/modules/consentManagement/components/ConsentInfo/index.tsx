import { Col, Divider, Modal, Row } from 'antd';
import React from 'react';

import Button from 'libraries/UI/Button';
import IconDelete from 'assets/icons/icon-delete';
import clsx from 'clsx';
import dayjs from 'dayjs';
import styles from './index.module.scss';

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

const ConsentInfo = ({ onClickEdit }: any) => {
  return (
    <div className={styles.consentInfo}>
      <Row>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Consent Name<span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>Consent ABC</p>
        </Col>
        <Col xs={2}></Col>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Application<span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>Application Huy Hung</p>
        </Col>
      </Row>
      <Row>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Product ID<span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>Text Product ID 12345</p>
        </Col>
        <Col xs={2}></Col>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Product Name<span className={styles.asterisk}>*</span>
          </p>
          <p className={clsx(styles.value, styles.leftSpace)}>Product Test</p>
        </Col>
      </Row>
      <Row>
        <Col xs={24} className={styles.info}>
          <p className={styles.label}>
            Services<span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>Service GHI</p>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Status<span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>Test Status</p>
        </Col>
        <Col xs={2}></Col>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>Expiry Date</p>
          <p className={clsx(styles.value, styles.leftSpace)}>27/05/2025</p>
        </Col>
      </Row>
      <Row>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>Title</p>
          <p className={styles.value}>Test Title</p>
        </Col>
        <Col xs={2}></Col>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>Version</p>
          <p className={styles.value}>12.333</p>
        </Col>
      </Row>
      <Row>
        <Col xs={24} className={clsx(styles.info, styles.content)}>
          <p className={styles.label}>
            Content<span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
            consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet
            minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
            consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </p>
        </Col>
      </Row>
      <Row className={styles.flexend}>
        <Button onClick={onClickEdit} icon={ICON_EDIT} className={styles.editBtn}>
          Edit
        </Button>
      </Row>
    </div>
  );
};

export default ConsentInfo;
