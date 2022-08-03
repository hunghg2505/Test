import { Col, DatePicker, Form, Row } from 'antd';

import styles from './index.module.scss';

import InputForm from 'libraries/form/input/input-form';
import Select from 'libraries/UI/Select';
import moment from 'moment';
import { RegexUtils } from 'utils/regex-helper';
import { isNumber } from 'lodash';

export const FormEditUser = ({ form, onUpdateProfile, userInfo, t }: any) => {
  return (
    <Form
      onFinish={onUpdateProfile}
      form={form}
      layout='vertical'
      initialValues={{
        birthday: moment(userInfo?.dateOfBirth),
        cardId: userInfo?.cardId || '',
        email: userInfo?.email || '',
        firstNameEn: userInfo?.firstNameEn || '',
        firstNameTh: userInfo?.firstNameTh || '',
        laserCode: userInfo?.laserCode || '',
        lastNameEn: userInfo?.lastNameEn || '',
        lastNameTh: userInfo?.lastNameTh || '',
        // mobile: userInfo?.mobile || '',
        nationality: userInfo?.nationality || '',
        passportNo: userInfo?.passportNo || '',
      }}
    >
      <Row gutter={[18, 25]}>
        <Col xs={12}>
          <InputForm
            name='firstNameEn'
            placeholder={t('first_name_en')}
            label={t('first_name_en')}
            maxLength={55}
            rules={[
              {
                required: true,
                message: t('messages.errors.require', { field: t('first_name_en') }),
              },
            ]}
          />
        </Col>
        <Col xs={12}>
          <InputForm
            name='lastNameEn'
            placeholder={t('last_name_en')}
            label={t('last_name_en')}
            maxLength={55}
            rules={[
              {
                required: true,
                message: t('messages.errors.require', { field: t('last_name_en') }),
              },
            ]}
          />
        </Col>
        <Col xs={12}>
          <InputForm
            name='firstNameTh'
            placeholder={t('first_name_th')}
            label={t('first_name_th')}
            maxLength={55}
            rules={[
              {
                required: true,
                message: t('messages.errors.require', { field: t('first_name_th') }),
              },
            ]}
          />
        </Col>
        <Col xs={12}>
          <InputForm
            name='lastNameTh'
            placeholder={t('last_name_th')}
            label={t('last_name_th')}
            maxLength={55}
            rules={[
              {
                required: true,
                message: t('messages.errors.require', { field: t('last_name_th') }),
              },
            ]}
          />
        </Col>

        <Col xs={12} className={styles.itemBirthday}>
          <Form.Item
            name='birthday'
            label={t('birthday')}
            rules={[
              {
                required: true,
                message: t('messages.errors.require', { field: t('birthday') }),
              },
            ]}
          >
            <DatePicker placeholder={t('birthday')} format={'MM/DD/YYYY'} />
          </Form.Item>
        </Col>

        <Col xs={12}>
          <InputForm
            name='email'
            placeholder={t('email_address')}
            label={t('email_address')}
            maxLength={30}
            rules={[
              {
                validator: async (_, value) => {
                  const email = `${value}`?.trim();
                  if (!email)
                    return Promise.reject(
                      t('messages.errors.require', { field: t('email_address') }),
                    );

                  const isEmail = RegexUtils.isEmail(email);

                  if (!isEmail)
                    return Promise.reject('Please input correct email format example@domain.com');

                  const isEmailExist = true;

                  if (isEmailExist)
                    return Promise.reject('Email already exist, please use another email');

                  return Promise.resolve();
                },
              },
            ]}
          />
        </Col>

        <Col xs={12}>
          <InputForm
            name='mobile'
            placeholder={t('mobile_number')}
            label={t('mobile_number')}
            normalize={(value, prevValue) => {
              if (!RegexUtils.isNumber(value)) return prevValue;
              console.log({
                value,
                prevValue,
              });
              return value;
            }}
            rules={[
              {
                validator: async (_, value) => {
                  const phone = `${value}`?.trim();
                  if (!phone)
                    return Promise.reject(
                      t('messages.errors.require', { field: t('mobile_number') }),
                    );

                  // const isMatch = RegexUtils.isNumber(phone);

                  // if (!isMatch)
                  //   return Promise.reject('Mobile number should be in the format: 66 8123456789');

                  return Promise.resolve();
                },
              },
            ]}
            maxLength={11}
          />
        </Col>

        <Col xs={12}>
          <InputForm
            name='cardId'
            placeholder={t('national_card_id')}
            label={t('national_card_id')}
            rules={[
              {
                required: true,
                message: t('messages.errors.require', { field: t('national_card_id') }),
              },
            ]}
            maxLength={13}
          />
        </Col>

        <Col xs={12}>
          <Form.Item name='nationality' label={t('nationality')}>
            <Select placeholder={t('nationality')}>
              <Select.Option value=''>Select Nationality</Select.Option>
              <Select.Option value='Thailand'>Thailand</Select.Option>
              <Select.Option value='Other'>Other</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={12}>
          <InputForm
            name='passportNo'
            placeholder={t('passport_number')}
            label={t('passport_number')}
            rules={[
              {
                required: true,
                message: t('messages.errors.require', { field: t('passport_number') }),
              },
              {
                pattern: new RegExp(RegexUtils.RegexConstants.REGEX_PASSPORT),
                message: `${t('messages.errors.onlyNumber', { field: t('passport_number') })}`,
              },
            ]}
            maxLength={9}
          />
        </Col>

        <Col xs={12}>
          <InputForm
            name='laserCode'
            placeholder={t('laser_code')}
            label={t('laser_code')}
            maxLength={12}
            rules={[
              {
                required: true,
                message: t('messages.errors.require', { field: t('laser_code') }),
              },
              {
                pattern: new RegExp(RegexUtils.RegexConstants.REGEX_LASER_CODE),
                message: `${t('messages.errors.onlyNumber', { field: t('laser_code') })}`,
              },
            ]}
          />
        </Col>
      </Row>
    </Form>
  );
};
