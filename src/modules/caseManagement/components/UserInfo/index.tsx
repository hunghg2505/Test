import { Col, Form, Row } from 'antd';
import InputForm from 'libraries/form/input/input-form';
import Select from 'libraries/UI/Select';
import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';

const UserInfo = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2 className={styles.heading}>User&apos;s Infomation</h2>
      <div className={styles.form}>
        <Form layout='vertical'>
          <Row gutter={[15, 24]}>
            <Col xs={12}>
              <InputForm
                label={t('first_name_en')}
                name={'first_name_en'}
                placeholder='First name'
              />
            </Col>

            <Col xs={12}>
              <InputForm label={t('last_name_en')} name={'last_name_en'} placeholder='Last name' />
            </Col>

            <Col xs={12}>
              <InputForm
                label={t('first_name_th')}
                name={'first_name_th'}
                placeholder='First name'
              />
            </Col>

            <Col xs={12}>
              <InputForm label={t('last_name_th')} name={'last_name_th'} placeholder='Last name' />
            </Col>

            <Col xs={12}>
              <InputForm label={t('address')} name={'address'} placeholder='Address' />
            </Col>

            <Col xs={12}>
              <InputForm
                label={t('date_of_birthday')}
                name={'date_of_birthday'}
                placeholder='Date of Birthday'
              />
            </Col>

            <Col xs={12}>
              <InputForm label={t('email')} name={'email'} placeholder='Email Address' />
            </Col>

            <Col xs={12}>
              <InputForm label={t('card_id')} name={'card_id'} placeholder='National Card ID' />
            </Col>

            <Col xs={12}>
              <Form.Item name={'nationality'} label={t('nationality')}>
                <Select>
                  <Select.Option value={1}>1</Select.Option>
                  <Select.Option value={2}>2</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={12}>
              <InputForm label={t('passport')} name={'passport'} placeholder='Passport' />
            </Col>

            <Col xs={12}>
              <InputForm label={t('laser_code')} name={'laser_code'} placeholder='Laser Code' />
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default UserInfo;
