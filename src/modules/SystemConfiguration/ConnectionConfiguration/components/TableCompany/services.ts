/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_PATH, APPLICATION_SERVICE_BASE_URL } from './../../../../../utils/api/constant';
import { clearCache, useRequest } from 'ahooks';
import ApiUtils from 'utils/api/api.utils';
import { message } from 'antd';

const getApplications = async (companyId: any, prevList: any, current = 1) => {
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
    pageSize: 10,
    data: [...prevList, ...currentData],
    isLoadMore: +r?.content?.metadata?.currentPage < +r?.content?.metadata?.lastPage,
    companyId: companyId,
  };
};

export const useApplications = (companyId: any) => {
  const { data, loading, run } = useRequest(
    async (current, prevList = []) => {
      return getApplications(companyId, prevList, current);
    },
    {
      cacheKey: `data-application-${companyId}`,
      staleTime: -1,
    },
  );

  const refreshApplication = () => {
    clearCache(`data-application-${companyId}`);
    run(1, []);
  };

  const requestDeleteApp = useRequest(
    async (appId: any) => {
      return ApiUtils.remove(APPLICATION_SERVICE_BASE_URL, { id: +appId });
    },
    {
      manual: true,
    },
  );

  const onChange = (page: number) => {
    clearCache(`data-application-${companyId}`);
    run(page);
  };

  const deleteApplication = (idApp: any) => async () => {
    try {
      await requestDeleteApp.runAsync(idApp);
      refreshApplication();
    } catch (error) {
      console.log('error', error);
    }
  };

  return {
    applications: data,
    loading,
    refreshApplication,
    onChange,
    deleteApplication,
  };
};

const serviceGetEndpointByApplicationId = async (appId: any, prevList = [], page = 1) => {
  const params = {
    limit: 5,
    page: page || 1,
  };

  const res: any = await ApiUtils.fetch(API_PATH.APP_ENDPOINT_DETAIL(appId), params);
  const currentEndpoints = res?.content?.data || [];

  return {
    endpoints: [...prevList, ...currentEndpoints],
    isLoadMore: +res?.content?.metadata?.currentPage < +res?.content?.metadata?.lastPage,
    currentPage: +res?.content?.metadata?.currentPage,
  };
};

export const useEndpoint = (appId: any) => {
  const { data, run } = useRequest(
    async (prevEndpoints, page) => {
      return serviceGetEndpointByApplicationId(appId, prevEndpoints, page);
    },
    {
      cacheKey: `data-endpoint-${appId}`,
      manual: true,
    },
  );

  const onLoadMore = () => {
    clearCache(`data-endpoint-${appId}`);
    run(data?.endpoints, (data?.currentPage || 0) + 1);
  };

  const requestDeleteEndpoint = useRequest(
    async (endpointId: any) => {
      return ApiUtils.remove(API_PATH.APP_ENDPOINT(endpointId));
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('Delete Endpoint Success');
      },
      onError: (error: any) => {
        message.error(
          error?.content?.messageContent
            ? `${error?.content?.messageContent}`
            : 'Delete Endpoint Error',
        );
      },
    },
  );

  const requestUpdateEndpoint = useRequest(
    async (values, endpointId: any) => {
      return ApiUtils.put(API_PATH.APP_ENDPOINT(endpointId), values);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('Edit Endpoint Success');
      },
      onError: (error: any) => {
        message.error(
          error?.content?.messageContent
            ? `${error?.content?.messageContent}`
            : 'Edit Endpoint Error',
        );
      },
    },
  );

  const requestAddEndpoint = useRequest(
    async (values, applicationId: number | string) => {
      return ApiUtils.post(API_PATH.APP_ENDPOINT(applicationId), values);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('Add Endpoint Success');
      },
      onError: (error: any) => {
        message.error(
          error?.content?.messageContent
            ? `${error?.content?.messageContent}`
            : 'Add Endpoint Error',
        );
      },
    },
  );

  const deleteEndpoint = (endpointId: any) => async () => {
    try {
      clearCache(`data-endpoint-${appId}`);
      await requestDeleteEndpoint.runAsync(endpointId);
      run([], 1);
    } catch (error) {
      console.log('error', error);
    }
  };

  const updateEndpoint = async ({ endpointId, ...rest }: any) => {
    try {
      clearCache(`data-endpoint-${appId}`);
      await requestUpdateEndpoint.runAsync(rest, endpointId);
      run([], 1);
    } catch (error) {
      console.log('error', error);
      run([], 1);
    }
  };

  const addEndpoint = async ({ applicationId, ...rest }: any) => {
    try {
      clearCache(`data-endpoint-${appId}`);
      await requestAddEndpoint.runAsync(rest, applicationId);
      run([], 1);
    } catch (error) {
      console.log('error', error);
    }
  };

  return {
    endpoints: data?.endpoints,
    isLoadMore: data?.isLoadMore,
    onLoadMore,
    deleteEndpoint,
    updateEndpoint,
    addEndpoint,
    onFirstLoad: run,
  };
};
