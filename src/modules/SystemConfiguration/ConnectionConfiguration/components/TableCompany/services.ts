import { API_PATH } from './../../../../../utils/api/constant';
import { useRequest } from 'ahooks';
import ApiUtils from 'utils/api/api.utils';

const getApplications = async (companyId: any) => {
  const params = {
    companyId: +companyId,
    limit: 10,
    page: 1,
  };
  return ApiUtils.fetch(API_PATH.GET_LIST_APPLICATIONS, params);
};

export const useApplications = (companyId: any) => {
  return useRequest(
    async () => {
      return getApplications(companyId);
    },
    {
      cacheKey: `data-application-${companyId}`,
      debounceMaxWait: 350,
    },
  );
};
