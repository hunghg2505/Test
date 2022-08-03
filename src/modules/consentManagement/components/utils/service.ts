import { useMount, useRequest } from 'ahooks';
import dayjs from 'dayjs';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { useRef, useState } from 'react';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';
import { capitalizeFirstLetter } from 'utils/common.utils';

export const getConsentManagementService = async (values: any): Promise<any> => {
  const params: any = {
    limit: 10,
    isEqualSearch: !!values?.isEqualSearch,
    page: values?.page || 1,
    appName: values.appName || '',
    advanceSearch: values?.advanceSearch,
  };

  const response: any = await ApiUtils.post(API_PATH.GET_LIST_CONSENTS, params);

  return {
    total: response?.content?.metadata?.total || 0,
    current: +response?.content?.metadata?.currentPage || 1,
    pageSize: +response?.content?.metadata?.itemPage || 10,
    data:
      response?.content?.data?.map((item: any, idx: number) => ({
        ...item,
        key: `${item?.id}`,
        updatedDate: dayjs(item?.updatedAt).format('DD/MM/YYYY'),
        createdDate: dayjs(item?.createdAt).format('DD/MM/YYYY'),
        appName: item?.__application__?.appName,
        appId: item?.__application__?.appId,
        status: capitalizeFirstLetter(item?.status),
      })) || [],
    appName: params?.appName || '',
    isEqualSearch: params?.isEqualSearch || '',
    advanceSearch: params['advanceSearch'],
  };
};

const getListSuggestionApp = async (value: string, page: number) => {
  const params = {
    name: value,
    limit: 10,
    page: page || 1,
  };

  const response: any = await ApiUtils.fetch(API_PATH.GET_LIST_APPLICATION, params);

  return {
    data: response?.content?.data.map((item: any, index: number) => {
      return {
        key: `${item?.id}${index}`,
        name: item.appName,
      };
    }),
    isLoadMore: +response?.content?.metadata?.currentPage < +response?.content?.metadata?.lastPage,
    currentPage: +response?.content?.metadata?.currentPage,
    value,
  };
};

export const useConsentManagement = () => {
  const refCancelRequest = useRef(false);

  const [applications, setApplications] = useState<{
    data: any[];
    isLoadMore: boolean;
    currentPage: number;
    value: string;
  }>({
    data: [],
    isLoadMore: false,
    currentPage: 1,
    value: '',
  });

  const { data, loading, run } = useRequest(
    ({ value, isEqualSearch, page, advanceSearch }: any) =>
      getConsentManagementService({ appName: value, isEqualSearch, page, advanceSearch }),
    {
      manual: true,
      cacheKey: 'consent-management',
    },
  );

  const reqSearchApplicationSuggestion = useRequest(
    async ({
      value,
      page = 1,
      isLoadMore = false,
    }: {
      value: string;
      page: number;
      isLoadMore: boolean;
    }) => {
      if (refCancelRequest.current) throw Error('Block request');
      return getListSuggestionApp(value, page);
    },
    {
      manual: true,
      refreshDeps: [refCancelRequest.current],
      onError: (err: any) => {
        refCancelRequest.current = false;
      },
      onSuccess: (r: any, params) => {
        const isLoadMore = params[0].isLoadMore;

        setApplications((prev) => {
          const newData = isLoadMore ? [...prev.data, ...r.data] : r.data;

          return {
            data: newData,
            isLoadMore: r.isLoadMore,
            currentPage: r.currentPage,
            value: r.value,
          };
        });
      },
    },
  );

  const onSearchApplicationSuggestionDebounce = debounce(
    async (values: any[], callback: () => void) => {
      const value = get(values, '[0].value', '');
      if (value?.length < 3) return;

      await reqSearchApplicationSuggestion.runAsync({ value, page: 1, isLoadMore: false });
      if (callback) callback();
    },
    350,
  );

  const onResetApplication = () => {
    setApplications({
      data: [],
      isLoadMore: false,
      currentPage: 1,
      value: '',
    });
  };

  const onLoadMoreApplications = () => {
    reqSearchApplicationSuggestion.run({
      value: applications.value,
      page: applications.currentPage + 1,
      isLoadMore: true,
    });
  };

  const onChangePage = (page: number) => {
    run({
      page,
      value: data?.appName,
      isEqualSearch: data?.isEqualSearch,
      advanceSearch: data?.advanceSearch,
    });
  };

  const onSearchConsent = (values: any, callback?: () => void) => {
    if (values?.type === 'enter') refCancelRequest.current = true;
    run({
      page: 1,
      value: values?.appName || '',
      isEqualSearch: values?.isEqualSearch,
      advanceSearch: values?.advanceSearch,
    });
    if (callback) callback();
  };

  const onReloadConsentData = () => {
    run({
      page: data?.current || 1,
    });
  };

  useMount(() => {
    run({
      page: data?.current || 1,
      value: data?.appName,
      isEqualSearch: data?.isEqualSearch,
      advanceSearch: data?.advanceSearch,
    });
  });

  return {
    data,
    loading,
    onChangePage,
    onSearchConsent,
    onReloadConsentData,
    applications,
    reqSearchApplicationSuggestion,
    onSearchApplicationSuggestionDebounce,
    onLoadMoreApplications,
    onResetApplication,
  };
};
