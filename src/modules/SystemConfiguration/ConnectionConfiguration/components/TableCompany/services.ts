import { API_PATH, APPLICATION_SERVICE_BASE_URL } from './../../../../../utils/api/constant';
import { clearCache, useRequest } from 'ahooks';
import ApiUtils from 'utils/api/api.utils';

const getApplications = async (companyId: any, current = 1, prevList: any) => {
  const params = {
    companyId: +companyId,
    limit: 10,
    page: current || 1,
  };
  const r: any = await ApiUtils.fetch(API_PATH.GET_LIST_APPLICATIONS, params);

  const currentData = r?.content?.data?.map((app: any) => {
    return {
      ...app,
      endpoints: app?.__endpoints__,
    };
  });

  return {
    total: r?.content?.metadata?.total || 0,
    current: current || 1,
    pageSize: +r?.content?.metadata?.itemPage || 10,
    data: [...prevList, ...currentData],
    isLoadMore: +r?.content?.metadata?.currentPage < +r?.content?.metadata?.lastPage,
    companyId: companyId,
  };
};

export const useApplications = (companyId: any) => {
  const { data, loading, run } = useRequest(
    async (current, prevList = []) => {
      return getApplications(companyId, current, prevList);
    },
    {
      cacheKey: `data-application-${companyId}`,
      staleTime: -1,
      debounceMaxWait: 350,
    },
  );

  const requestDeleteApp = useRequest(
    async (appId: any) => {
      return ApiUtils.remove(`${APPLICATION_SERVICE_BASE_URL}/${appId}`, { applicationId: +appId });
    },
    {
      manual: true,
    },
  );

  const requestUpdateApp = useRequest(
    async (appId: any, name: string) => {
      return ApiUtils.put(APPLICATION_SERVICE_BASE_URL, {
        id: +appId,
        companyId: +companyId,
        name,
      });
    },
    {
      manual: true,
    },
  );

  const requestDeleteEndpoint = useRequest(
    async (endpointId: any) => {
      return ApiUtils.remove(API_PATH.APP_ENDPOINT(endpointId));
    },
    {
      manual: true,
    },
  );

  const requestUpdateEndpoint = useRequest(
    async (values, endpointId: any) => {
      return ApiUtils.remove(API_PATH.APP_ENDPOINT(endpointId), values);
    },
    {
      manual: true,
    },
  );

  const onLoadMore = () => {
    run((data?.current || 0) + 1, data?.data);
  };

  const refreshApplication = () => {
    clearCache(`data-application-${companyId}`);
    run(1, []);
  };

  const deleteApplication = (idApp: any) => async () => {
    try {
      await requestDeleteApp.runAsync(idApp);
      refreshApplication();
    } catch (error) {
      console.log('error', error);
    }
  };

  const updateApplication = async (idApp: any, name: string) => {
    try {
      await requestUpdateApp.runAsync(idApp, name);
      refreshApplication();
    } catch (error) {
      console.log('error', error);
    }
  };

  const deleteEndpoint = (endpointId: any) => async () => {
    try {
      await requestDeleteEndpoint.runAsync(endpointId);
      refreshApplication();
    } catch (error) {
      console.log('error', error);
    }
  };

  const updateEndpoint = async ({ endpointId, ...rest }: any) => {
    try {
      await requestUpdateEndpoint.runAsync(rest, endpointId);
      refreshApplication();
    } catch (error) {
      console.log('error', error);
    }
  };

  return {
    applications: data,
    loading,
    refreshApplication,
    onLoadMore,
    deleteApplication,
    updateApplication,
    deleteEndpoint,
    updateEndpoint,
  };
};
