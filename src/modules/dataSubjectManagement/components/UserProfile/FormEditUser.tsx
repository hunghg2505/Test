import { Col, DatePicker, Form, Row } from 'antd';

import styles from './index.module.scss';

import country from 'country-list-js';
import InputForm from 'libraries/form/input/input-form';
import Select from 'libraries/UI/Select';
import moment from 'moment';
import { disabledFutureDate } from 'utils/common.utils';
import { RegexUtils } from 'utils/regex-helper';
import { useCheckParams } from './service';

const assertThaiId = (thaiId: string): boolean => {
  const m = thaiId.match(/(\d{12})(\d)/);
  if (!m) {
    throw new Error('thai-id-must-be-13-digits');
  }
  const digits = m[1].split('');
  const sum = digits.reduce((total: number, digit: string, i: number) => {
    return total + (13 - i) * +digit;
  }, 0);
  const lastDigit = `${(11 - (sum % 11)) % 10}`;
  const inputLastDigit = m[2];
  if (lastDigit !== inputLastDigit) {
    return false;
  }
  return true;
};

export const FormEditUser = ({ form, userInfo, t }: any) => {
  const requestCheckParams = useCheckParams();

  const initialValues = {
    dateOfBirth: moment(userInfo?.dateOfBirth),
    cardId: userInfo?.cardId || '',
    email: userInfo?.email || '',
    firstNameEn: userInfo?.firstNameEn || '',
    firstNameTh: userInfo?.firstNameTh || '',
    laserCode: userInfo?.laserCode || '',
    lastNameEn: userInfo?.lastNameEn || '',
    lastNameTh: userInfo?.lastNameTh || '',
    mobile: userInfo?.mobile || '',
    nationality: userInfo?.nationality || '',
    passportNo: userInfo?.passportNo || '',
  };

  return (
    <Form
      // onFinish={onUpdateProfile}
      form={form}
      layout='vertical'
      initialValues={initialValues}
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
            name='dateOfBirth'
            label={t('birthday')}
            rules={[
              {
                required: true,
                message: t('messages.errors.require', { field: t('birthday') }),
              },
            ]}
          >
            <DatePicker
              placeholder='dd/mm/yyyy'
              format={'DD/MM/YYYY'}
              disabledDate={disabledFutureDate}
            />
          </Form.Item>
        </Col>

        <Col xs={12}>
          <InputForm
            name='email'
            placeholder='example@domain.com'
            label={t('email_address')}
            maxLength={30}
            rules={[
              {
                validator: async (_, value) => {
                  try {
                    const email = `${value}`?.trim();
                    if (!email)
                      return Promise.reject(
                        t('messages.errors.require', { field: t('email_address') }),
                      );

                    const isEmail = RegexUtils.isEmail(email);

                    if (!isEmail)
                      return Promise.reject('Please input correct email format example@domain.com');

                    if (value === initialValues.email) {
                      return Promise.resolve();
                    }

                    const r = await requestCheckParams.runAsync({ email });

                    if (r?.existed)
                      return Promise.reject('Email already exist, please use another email');

                    return Promise.resolve();
                  } catch (error) {
                    return Promise.resolve();
                  }
                },
              },
            ]}
          />
        </Col>

        <Col xs={12}>
          <InputForm
            name='mobile'
            placeholder='eg. 66 8 123456789'
            label={t('mobile_number')}
            // normalize={(value, prevValue) => {
            //   if (!RegexUtils.isNumber(value)) return prevValue;
            //   return value;
            // }}
            rules={[
              {
                pattern: new RegExp(RegexUtils.RegexConstants.REGEX_MOBILE_NUMBER),
                message: `${t('messages.errors.invalid_mobile_number')}`,
              },
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
            normalize={(val = '') => val.replace(/\s/, '')}
            rules={[
              {
                validator: async (_, value) => {
                  try {
                    const cardId = `${value}`?.trim();
                    if (!cardId)
                      return Promise.reject(
                        t('messages.errors.require', { field: t('national_card_id') }),
                      );

                    const valueNoDash = cardId.split('-').join('');

                    if (valueNoDash.length < 13) {
                      return Promise.reject(`National ID card must be 13 digits`);
                    }

                    const isValid = assertThaiId(valueNoDash);

                    if (!isValid) {
                      return Promise.reject(`${t('messages.errors.invalid_national_code')}`);
                    }

                    if (value === initialValues.nationality) {
                      return Promise.resolve();
                    }

                    const r = await requestCheckParams.runAsync({ cardId });

                    if (r?.existed)
                      return Promise.reject('National Card ID already exist, please check again');

                    return Promise.resolve();
                  } catch (error) {
                    return Promise.resolve();
                  }
                },
              },
            ]}
            maxLength={17}
          />
        </Col>

        <Col xs={12}>
          <Form.Item
            name='nationality'
            label={t('nationality')}
            rules={[
              {
                required: true,
                message: t('messages.errors.require', { field: t('nationality') }),
              },
            ]}
          >
            <Select placeholder={t('nationality')} allowClear={true} showSearch>
              {country
                .names()
                .sort()
                .map((name, index) => (
                  <Select.Option value={name} key={`${name}${index}`}>
                    {name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={12}>
          <InputForm
            name='passportNo'
            placeholder={t('passport_number')}
            label={t('passport_number')}
            normalize={(val = '') => val.replace(/\s/, '')}
            rules={[
              {
                pattern: new RegExp(RegexUtils.RegexConstants.REGEX_PASSPORT),
                message: `${t('messages.errors.invalid_passport')}`,
              },
              {
                validator: async (_, value) => {
                  try {
                    const passportNo = `${value}`?.trim();
                    if (!passportNo)
                      return Promise.reject(
                        t('messages.errors.require', { field: t('national_card_id') }),
                      );

                    if (value === initialValues.passportNo) {
                      return Promise.resolve();
                    }
                    const r = await requestCheckParams.runAsync({ passportNo });

                    if (r?.existed)
                      return Promise.reject('Passport number already exist, please check again');

                    return Promise.resolve();
                  } catch (error) {
                    return Promise.resolve();
                  }
                },
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
            normalize={(val = '') => val.replace(/\s/, '')}
            maxLength={12}
            rules={[
              {
                pattern: new RegExp(RegexUtils.RegexConstants.REGEX_LASER_CODE),
                message: `${t('messages.errors.invalid_lasercode')}`,
              },
              {
                validator: async (_, value) => {
                  try {
                    const laserCode = `${value}`?.trim();
                    if (!laserCode)
                      return Promise.reject(
                        t('messages.errors.require', { field: t('laser_code') }),
                      );

                    if (value === initialValues.laserCode) {
                      return Promise.resolve();
                    }

                    const r = await requestCheckParams.runAsync({ laserCode });

                    if (r?.existed)
                      return Promise.reject('Laser code already exist, please check again');

                    return Promise.resolve();
                  } catch (error) {
                    return Promise.resolve();
                  }
                },
              },
            ]}
          />
        </Col>
      </Row>
    </Form>
  );
};
