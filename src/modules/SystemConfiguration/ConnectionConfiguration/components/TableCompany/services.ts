/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_PATH, APPLICATION_SERVICE_BASE_URL } from './../../../../../utils/api/constant';
import { clearCache, useRequest } from 'ahooks';
import ApiUtils from 'utils/api/api.utils';
import { message } from 'antd';

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

export const useApplications = (companyId: any, onEditAppError: any) => {
  const { data, loading, run } = useRequest(
    async (current, prevList = []) => {
      return getApplications(companyId, current, prevList);
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

  const requestUpdateApp = useRequest(
    async (appId: any, name: string, _callback?: any) => {
      return ApiUtils.put(APPLICATION_SERVICE_BASE_URL, {
        id: +appId,
        companyId: +companyId,
        name,
      });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('Edit Application Success');
        refreshApplication();
      },
      onError: (error: any, params: any) => {
        const callback = params?.[2];
        if (callback) callback();
        message.error(
          error?.content?.messageContent
            ? `${error?.content?.messageContent}`
            : 'Edit Application Error',
        );
        onEditAppError();
      },
    },
  );

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

  const updateApplication = async (idApp: any, name: string, callback?: any) => {
    try {
      await requestUpdateApp.runAsync(idApp, name, callback);
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

  const addEndpoint = async ({ applicationId, ...rest }: any) => {
    try {
      await requestAddEndpoint.runAsync(rest, applicationId);
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
    updateApplication,
    deleteEndpoint,
    updateEndpoint,
    addEndpoint,
  };
};
