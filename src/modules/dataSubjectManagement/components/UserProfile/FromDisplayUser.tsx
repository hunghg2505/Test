import { Col, Row } from 'antd';

import styles from './index.module.scss';

import moment from 'moment';

export const FromDisplayUser = ({ userInfo }: any) => {
  return (
    <Row className={styles.userInfoDisplay}>
      <Col span={12}>
        <Row gutter={[40, 0]} className={styles.row}>
          <Col className={styles.txtLabel} span={12}>
            First Name (EN)
          </Col>
          <Col className={styles.txtContent}>{userInfo?.firstNameEn}</Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row gutter={[40, 0]} className={styles.row}>
          <Col className={styles.txtLabel} span={12}>
            Last Name (EN)
          </Col>
          <Col className={styles.txtContent}>{userInfo?.lastNameEn}</Col>
        </Row>
      </Col>

      <Col span={12}>
        <Row gutter={[40, 0]} className={styles.row}>
          <Col className={styles.txtLabel} span={12}>
            First Name (TH)
          </Col>
          <Col className={styles.txtContent}>{userInfo?.firstNameTh}</Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row gutter={[40, 0]} className={styles.row}>
          <Col className={styles.txtLabel} span={12}>
            Last Name (TH)
          </Col>
          <Col className={styles.txtContent}>{userInfo?.lastNameTh}</Col>
        </Row>
      </Col>

      <Col span={12}>
        <Row gutter={[40, 0]} className={styles.row}>
          <Col className={styles.txtLabel} span={12}>
            Date of Birth
          </Col>
          <Col className={styles.txtContent}>
            {moment(userInfo?.dateOfBirth).format('MM/DD/YYYY')}
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row gutter={[40, 0]} className={styles.row}>
          <Col className={styles.txtLabel} span={12}>
            Email Address
          </Col>
          <Col className={styles.txtContent}>{userInfo?.email}</Col>
        </Row>
      </Col>

      <Col span={12}>
        <Row gutter={[40, 0]} className={styles.row}>
          <Col className={styles.txtLabel} span={12}>
            Mobile Number
          </Col>
          <Col className={styles.txtContent}>{userInfo?.mobile}</Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row gutter={[40, 0]} className={styles.row}>
          <Col className={styles.txtLabel} span={12}>
            National Card ID
          </Col>
          <Col className={styles.txtContent}>{userInfo?.cardId}</Col>
        </Row>
      </Col>

      <Col span={12}>
        <Row gutter={[40, 0]} className={styles.row}>
          <Col className={styles.txtLabel} span={12}>
            Nationality
          </Col>
          <Col className={styles.txtContent}>{userInfo?.nationality}</Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row gutter={[40, 0]} className={styles.row}>
          <Col className={styles.txtLabel} span={12}>
            Passpord Number
          </Col>
          <Col className={styles.txtContent}>{userInfo?.passportNo}</Col>
        </Row>
      </Col>

      <Col span={12}>
        <Row gutter={[40, 0]} className={styles.row}>
          <Col className={styles.txtLabel} span={12}>
            Laser Code
          </Col>
          <Col className={styles.txtContent}>{userInfo?.laserCode}</Col>
        </Row>
      </Col>
    </Row>
  );
};
