import { Button, Col, Form, Row, Upload } from 'antd';
import IconCamera from 'assets/icons/icon-camera';
import { IUserInfo } from 'modules/dataSubjectManagement/utils/service';
import { useTranslation } from 'react-i18next';

import useDataSubjectManagementPermission from 'hooks/useDataSubjectManagementPermission';
import styles from './index.module.scss';

import CustomButton from 'libraries/UI/Button';
import { useState } from 'react';
import ImgUserProfile from '../../../../assets/images/user-profile.png';
import { FromDisplayUser } from './FromDisplayUser';
import { FormEditUser } from './FormEditUser';
import { useUpdateConsent } from './service';
import { useParams } from 'react-router-dom';

const IconEdit = (
  <svg xmlns='http://www.w3.org/2000/svg' width={20} height={20} viewBox='0 0 20 20' fill='none'>
    <path
      d='M2.91675 17.5H17.9167'
      stroke='#CF2A2B'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M4.58325 11.1333V14.1667H7.63209L16.2499 5.54504L13.2062 2.5L4.58325 11.1333Z'
      stroke='#CF2A2B'
      strokeWidth='1.5'
      strokeLinejoin='round'
    />
  </svg>
);

function UserProfile({
  userInfo,
  isChangeProfile = true,
  refresh,
}: {
  userInfo?: IUserInfo;
  isChangeProfile?: boolean;
  refresh?: any;
}) {
  const { t } = useTranslation();
  const { isHavePermissionEditProfile } = useDataSubjectManagementPermission();
  const [formDisabled, setFormDisabled] = useState(true);
  const [form] = Form.useForm();
  const { id } = useParams();

  const onFinishSubmitForm = () => {
    setFormDisabled(true);
    refresh();
  };

  const updateUserProfileRequest = useUpdateConsent(onFinishSubmitForm);

  const onSubmit = () => {
    try {
      if (form.getFieldsError().filter((item: any) => item?.errors?.length !== 0).length === 0) {
        const values = form.getFieldsValue(true);
        updateUserProfileRequest.run({ ...values, userProfileId: id });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!userInfo) return null;

  return (
    <div className={styles.userInfoWrap}>
      {isHavePermissionEditProfile && (
        <Row justify='end' className={styles.btnActions}>
          {formDisabled ? (
            <CustomButton
              typeDisplay='ghost'
              className={styles.btnEdit}
              onClick={() => setFormDisabled(false)}
            >
              {IconEdit}Edit
            </CustomButton>
          ) : (
            <>
              <CustomButton className={styles.btnSave} onClick={onSubmit}>
                Submit
              </CustomButton>
              <CustomButton onClick={() => setFormDisabled(true)} className={styles.btnCancel}>
                Cancel
              </CustomButton>
            </>
          )}
        </Row>
      )}
      <Row className={styles.users}>
        <Col className={styles.avatar}>
          <div>
            <img alt='avatar' src={ImgUserProfile} />
            {isChangeProfile && (
              <Upload listType='picture' className={styles.btnUpload}>
                <Button icon={<IconCamera />}>Change</Button>
              </Upload>
            )}
          </div>
        </Col>
        <Col className={styles.userInfo} flex='1'>
          {formDisabled ? (
            <FromDisplayUser userInfo={userInfo} />
          ) : (
            <FormEditUser form={form} userInfo={userInfo} t={t} />
          )}
        </Col>
      </Row>
    </div>
  );
}

export default UserProfile;
