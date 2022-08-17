import { useRequest } from 'ahooks';
import { GENERAL_CASE_CONFIG_TYPE } from 'constants/common.constants';
import ApiUtils from 'utils/api/api.utils';
import { GENERAL_CONFIG_BASE_URL } from 'utils/api/constant';

const getDataDropDownService = async () => {
  const response: any = await ApiUtils.fetch(GENERAL_CONFIG_BASE_URL, {
    type: GENERAL_CASE_CONFIG_TYPE.CASE_STATUS,
  });

  return response?.content?.data;
};

export const useGetListStatus = () => {
  const { data } = useRequest(getDataDropDownService);

  return { data };
};
