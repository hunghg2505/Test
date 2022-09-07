import { useRequest } from 'ahooks';
import { message } from 'antd';
import { ResponseBase } from 'utils/api/api.types';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';

interface IEditUserProfile {
  userProfileId: 0;
  firstNameEn?: string;
  lastNameEn?: string;
  firstNameTh?: string;
  lastNameTh?: string;
  dateOfBirth?: string;
  email?: string;
  mobileNo?: string;
  idType?: string;
  idNo?: string;
  nationality?: string;
  thaiIdLaserNo?: string;
}

export const checkParams = async (values: any) => {
  let params: any = {
    email: values?.email,
    cardId: values?.cardId,
    thaiIdLaserNo: values?.thaiIdLaserNo,
    passportNo: values?.passportNo,
  };

  params = Object.keys(params).reduce((acc: any, k: any) => {
    if (params[k]) acc[k] = params[k];

    return acc;
  }, {});

  const r: any = await ApiUtils.post(API_PATH.CHECK_PARAMS, params);
  return r?.content;
};

export const useCheckParams = () => {
  return useRequest(checkParams, {
    manual: true,
    debounceWait: 300,
  });
};

const updateUserProfileService = async (body: IEditUserProfile) => {
  return ApiUtils.post<IEditUserProfile, ResponseBase<any>>(API_PATH.EDIT_USER_PROFILE, body);
};

export const useUpdateConsent = (onFinishSubmitForm: () => void) => {
  return useRequest(async (data: IEditUserProfile) => updateUserProfileService(data), {
    manual: true,
    onSuccess: () => {
      message.success('Edit User Profile Success');
      onFinishSubmitForm();
    },
    onError: () => {
      message.error('Edit User Profile Error');
      onFinishSubmitForm();
    },
  });
};
