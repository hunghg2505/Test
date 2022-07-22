import { Col, Row } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';

const UserInfo = ({ userInfo }: any) => {
  const { t } = useTranslation();

  if (!userInfo) return null;

  return (
    <>
      <h2 className={styles.heading}>User&apos;s Infomation</h2>
      <div className={styles.form}>
        <Row gutter={[18, 25]}>
          <Col xs={12}>
            <div className={styles.label}>{t('first_name_en')}</div>
            <div className={styles.content}>{userInfo.firstNameEn}</div>
          </Col>
          <Col xs={12}>
            <div className={styles.label}>{t('last_name_en')}</div>
            <div className={styles.content}>{userInfo.lastNameEn}</div>
          </Col>
          <Col xs={12}>
            <div className={styles.label}>{t('first_name_th')}</div>
            <div className={styles.content}>{userInfo.firstNameTh}</div>
          </Col>
          <Col xs={12}>
            <div className={styles.label}>{t('last_name_th')}</div>
            <div className={styles.content}>{userInfo.lastNameTh}</div>
          </Col>

          <Col xs={12}>
            <div className={styles.label}>{t('mobile_number')}</div>
            <div className={styles.content}>{userInfo.mobile}</div>
          </Col>
          <Col xs={12}>
            <div className={styles.label}>{t('birthday')}</div>
            <div className={styles.content}>{dayjs(userInfo.dateOfBirth).format('MM/DD/YYYY')}</div>
          </Col>

          <Col xs={12}>
            <div className={styles.label}>{t('email_address')}</div>
            <div className={styles.content}>{userInfo.email}</div>
          </Col>

          <Col xs={12}>
            <div className={styles.label}>{t('national_card_id')}</div>
            <div className={styles.content}>{userInfo.cardId}</div>
          </Col>

          <Col xs={12}>
            <div className={styles.label}>{t('nationality')}</div>
            <div className={styles.content}>{userInfo.nationality}</div>
          </Col>

          <Col xs={12}>
            <div className={styles.label}>{t('passport_number')}</div>
            <div className={styles.content}>{userInfo.passportNo}</div>
          </Col>

          <Col xs={12}>
            <div className={styles.label}>{t('laser_code')}</div>
            <div className={styles.content}>{userInfo.laserCode}</div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserInfo;
