import { Col, Row } from 'antd';
import { IUserInfo } from 'modules/dataSubjectManagement/utils/service';
import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';

function UserInfo({ userInfo }: { userInfo?: IUserInfo }) {
  const { t } = useTranslation();

  if (!userInfo) return null;

  return (
    <Row justify="space-between" className={styles.userInfoWrap}>
      <Col>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={305}
          height={449}
          viewBox="0 0 305 449"
          fill="none">
          <rect x="3.3584" y="0.5" width="297.17" height="446.255" fill="#C4C4C4" stroke="black" />
          <path d="M3.16699 0.536499L301.401 448" stroke="black" />
          <path d="M299.537 2.60901L3.2309 445.018" stroke="black" />
        </svg>
      </Col>
      <Col className={styles.userInfo}>
        <Row gutter={[18, 25]}>
          <Col xs={12}>
            <div className={styles.label}>{t('first_name')}</div>
            <div className={styles.content}>{userInfo.firstName}</div>
          </Col>
          <Col xs={12}>
            <div className={styles.label}>{t('last_name')}</div>
            <div className={styles.content}>{userInfo.lastName}</div>
          </Col>

          <Col xs={12}>
            <div className={styles.label}>Department</div>
            <div className={styles.content}>{userInfo.department}</div>
          </Col>
          <Col xs={12}>
            <div className={styles.label}>Work Email</div>
            <div className={styles.content}>{userInfo.email}</div>
          </Col>

          <Col xs={24}>
            <div className={styles.label}>Address</div>
            <div className={styles.content}>{userInfo.address}</div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default UserInfo;
