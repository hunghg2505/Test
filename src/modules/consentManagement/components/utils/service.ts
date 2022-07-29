import { useMount, useRequest } from 'ahooks';
import dayjs from 'dayjs';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';

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
        updatedDate: dayjs(item?.updated).format('DD/MM/YYYY'),
        createdDate: dayjs(item?.createdAt).format('DD/MM/YYYY'),
        appName: item?.__application__?.appName,
        appId: item?.__application__?.appId,
      })) || [],
    appName: params?.appName || '',
    isEqualSearch: params?.isEqualSearch || '',
    advanceSearch: params['advanceSearch'],
  };
};

export const useConsentManagement = () => {
  const { data, loading, run } = useRequest(
    ({ value, isEqualSearch, page, advanceSearch }: any) =>
      getConsentManagementService({ appName: value, isEqualSearch, page, advanceSearch }),
    {
      manual: true,
      cacheKey: 'consent-management',
    },
  );

  const onChangePage = (page: number) => {
    run({
      page,
      value: data?.appName,
      isEqualSearch: data?.isEqualSearch,
      advanceSearch: data?.advanceSearch,
    });
  };

  const onSearchConsent = (values: any) => {
    run({
      page: 1,
      value: values.appName,
      isEqualSearch: false,
    });
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
  };
};
