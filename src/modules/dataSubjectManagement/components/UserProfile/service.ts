import { useRequest } from 'ahooks';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';

export const checkParams = async (values: any) => {
  let params: any = {
    email: values?.email,
    cardId: values?.cardId,
    laserCode: values?.laserCode,
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
