import React, { useEffect, useState } from 'react';
import { Col, DatePicker, Form, Row } from 'antd';
import styles from './index.module.scss';
import InputForm from 'libraries/form/input/input-form';
import Button from 'libraries/UI/Button';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loading from 'libraries/components/loading';
import UserInfo from 'libraries/components/UserInfo';

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

const EditProfile = ({ userInfo, loading }: any) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [editUserProfileForm] = Form.useForm();

  const [dateOfBirth, setDateOfBirth] = useState<null | moment.Moment>(null);
  const [isEdit, setIsEdit] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (userInfo?.dateOfBirth) {
        setDateOfBirth(moment(userInfo?.dateOfBirth));
      }
    }
  }, [id, userInfo]);

  return (
    <>
      <div className={styles.actions}>
        <>
          {!isEdit ? (
            <>
              <Button
                onClick={() => {
                  setIsEdit(true);
                  editUserProfileForm.resetFields();
                }}
                className={styles.cancelBtn}
              >
                Cancel
              </Button>{' '}
              <Button htmlType='submit' onClick={() => editUserProfileForm.submit()}>
                Submit
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEdit(false)} icon={ICON_EDIT} className={styles.editBtn}>
              Edit
            </Button>
          )}
        </>
      </div>
      {!isEdit ? (
        <div className={styles.form}>
          {loading ? (
            <Loading />
          ) : (
            <Form
              layout='vertical'
              initialValues={{
                firstNameEn: userInfo.firstNameEn,
                lastNameEn: userInfo.lastNameEn,
                firstNameTh: userInfo.firstNameTh,
                lastNameTh: userInfo.lastNameTh,
                mobile: userInfo.mobile,
                email: userInfo.email,
                cardId: userInfo.cardId,
                nationality: userInfo.nationality,
                passportNo: userInfo.passportNo,
                laserCode: userInfo.laserCode,
              }}
              form={editUserProfileForm}
            >
              <Row gutter={[15, 24]}>
                <Col xs={12}>
                  <InputForm
                    label={t('first_name_en')}
                    name='firstNameEn'
                    placeholder={t('first_name_en')}
                    required
                    maxLength={55}
                  />
                </Col>
                <Col xs={12}>
                  <InputForm
                    label={t('last_name_en')}
                    name='lastNameEn'
                    placeholder={t('last_name_en')}
                    required
                    maxLength={55}
                  />
                </Col>
                <Col xs={12}>
                  <InputForm
                    label={t('first_name_th')}
                    name='firstNameTh'
                    placeholder={t('first_name_th')}
                    required
                    maxLength={55}
                  />
                </Col>
                <Col xs={12}>
                  <InputForm
                    label={t('last_name_th')}
                    name='lastNameTh'
                    placeholder={t('last_name_th')}
                    required
                    maxLength={55}
                  />
                </Col>
                <Col xs={12}>
                  <InputForm
                    label={t('mobile_number')}
                    name='mobile'
                    placeholder={t('mobile_number')}
                    required
                    maxLength={55}
                    rules={[
                      {
                        required: true,
                        message: t('messages.errors.require', { field: `${t('mobile_number')}` }),
                      },
                    ]}
                  />
                </Col>
                <Col xs={12}>
                  <p className={styles.datePickerLabel}>{t('birthday')}</p>
                  <DatePicker
                    getPopupContainer={(trigger: any) => trigger.parentElement}
                    format='DD/MM/YYYY'
                    style={{ width: '100%' }}
                    size='large'
                    onChange={(date: any) => setDateOfBirth(date)}
                    value={dateOfBirth}
                    placeholder='dd/mm/yyyy'
                  />
                </Col>
                <Col xs={12}>
                  <InputForm
                    label={t('email_address')}
                    name='email'
                    placeholder={t('email_address')}
                    required
                    maxLength={55}
                  />
                </Col>
                <Col xs={12}>
                  <InputForm
                    label={t('national_card_id')}
                    name='cardId'
                    placeholder={t('national_card_id')}
                    required
                    maxLength={55}
                  />
                </Col>
                <Col xs={12}>
                  <InputForm
                    label={t('nationality')}
                    name='nationality'
                    placeholder={t('nationality')}
                    required
                    maxLength={55}
                  />
                </Col>
                <Col xs={12}>
                  <InputForm
                    label={t('passport_number')}
                    name='passportNo'
                    placeholder={t('passport_number')}
                    required
                    maxLength={55}
                  />
                </Col>
                <Col xs={12}>
                  <InputForm
                    label={t('laser_code')}
                    name='laserCode'
                    placeholder={t('laser_code')}
                    required
                    maxLength={55}
                  />
                </Col>
              </Row>
            </Form>
          )}
        </div>
      ) : (
        <UserInfo userInfo={userInfo} />
      )}
    </>
  );
};

export default EditProfile;
