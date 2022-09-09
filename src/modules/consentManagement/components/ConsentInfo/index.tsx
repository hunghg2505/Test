import { Col, Divider, Row } from 'antd';

import clsx from 'clsx';
import dayjs from 'dayjs';
import styles from './index.module.scss';

const ConsentInfo = ({ data }: any) => {
  return (
    <div className={styles.consentInfo}>
      <Row>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Consent Name<span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>{data?.consentName}</p>
        </Col>
        <Col xs={2}></Col>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Consent ID<span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>{data?.id}</p>
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
          <p className={styles.value}>{data?.application}</p>
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
          <p className={styles.value}>{data?.status}</p>
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
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Activation Date<span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>
            {data?.activationDate ? dayjs(data?.activationDateTime).format('DD/MM/YY') : 'N/A'}
          </p>
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
            Title EN<span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>{data?.titleEn}</p>
        </Col>
        <Col xs={2}></Col>
        <Col xs={11} className={styles.info}>
          <p className={styles.label}>
            Title TH <span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value}>{data?.titleTh}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={24} className={clsx(styles.info, styles.content)}>
          <p className={styles.label}>
            Content EN<span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value} style={{ lineHeight: 1.5 }}>
            {data?.contentEn}
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={24} className={clsx(styles.info, styles.content)}>
          <p className={styles.label}>
            Content TH<span className={styles.asterisk}>*</span>
          </p>
          <p className={styles.value} style={{ lineHeight: 1.5 }}>
            {data?.contentTh}
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default ConsentInfo;
