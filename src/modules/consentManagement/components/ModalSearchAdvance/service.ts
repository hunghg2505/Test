import { useRequest } from 'ahooks';
import { GENERAL_CONSENT_CONFIG_TYPE } from 'constants/common.constants';
import ApiUtils from 'utils/api/api.utils';
import { GENERAL_CONFIG_CONSENT_BASE_URL } from 'utils/api/constant';

const getDataDropDownService = async () => {
  const response: any = await ApiUtils.fetch(GENERAL_CONFIG_CONSENT_BASE_URL, {
    type: GENERAL_CONSENT_CONFIG_TYPE.CONSENT_STATUS,
  });

  return response?.content?.data;
};

export const useGetListStatusConsent = () => {
  const { data } = useRequest(getDataDropDownService);

  return { data };
};
