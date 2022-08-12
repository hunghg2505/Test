import { useMount, useRequest } from 'ahooks';
import dayjs from 'dayjs';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { useRef, useState } from 'react';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';

const getListCompanyService = async (values: any): Promise<any> => {
  const params: any = {
    limit: 10,
    page: values?.page || 1,
    name: values.name || '',
    advanceSearch: values?.advanceSearch,
  };

  const response: any = await ApiUtils.post(API_PATH.GET_LIST_COMPANY, params);

  return {
    total: response?.content?.metadata?.total || 0,
    current: +response?.content?.metadata?.currentPage || 1,
    pageSize: 10,
    data:
      response?.content?.data?.map((item: any) => ({
        ...item,
        key: `${item?.id}`,
        createdDate: dayjs(item?.createdAt).format('DD/MM/YYYY'),
      })) || [],
    name: params?.name || '',
    advanceSearch: params['advanceSearch'],
  };
};

const getCompaniesSuggestion = async (value: any, page = 1, column: string) => {
  const params = {
    column,
    searchString: value || '',
    limit: 10,
    page,
  };

  const res: any = await ApiUtils.fetch(API_PATH.GET_COMPANY_SUGGESTION, params);

  return {
    data: res?.content?.data?.map((v: any, idx: number) => ({ id: idx, name: v })),
    isLoadMore: +res?.content?.metadata?.currentPage < +res?.content?.metadata?.lastPage,
    currentPage: +res?.content?.metadata?.currentPage,
    value,
  };
};

export const useCompanies = () => {
  const refCancelRequest = useRef(false);
  const [companies, setCompanies] = useState<{
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

  const { data, loading, run, refresh } = useRequest(
    ({ value, page, advanceSearch }: any) =>
      getListCompanyService({ name: value, page, advanceSearch }),
    {
      manual: true,
      cacheKey: 'company-management',
    },
  );

  const requestSearchCompaniesSuggestion = useRequest(
    async (value: string, column, page = 1, isLoadMore = false) => {
      if (refCancelRequest.current) throw Error('Block request');
      return getCompaniesSuggestion(value, page, column);
    },
    {
      manual: true,
      refreshDeps: [refCancelRequest.current],
      onError: (err: any) => {
        refCancelRequest.current = false;
      },
      onSuccess: (r: any, params) => {
        const isLoadMore = params[3];

        setCompanies((prev) => {
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

  const onResetCompaniesSuggestion = () => {
    setCompanies({
      data: [],
      isLoadMore: false,
      currentPage: 1,
      value: '',
    });
  };

  const onLoadMoreCompanies = (column: string) => {
    requestSearchCompaniesSuggestion.run(companies.value, column, companies.currentPage + 1, true);
  };

  const onSearchCompaniesDebounce = debounce(
    async (value: string, callback: () => void, column: string) => {
      if (value?.length < 3) return;

      await requestSearchCompaniesSuggestion.runAsync(value, column, 1, false);
      if (callback) callback();
    },
    350,
  );

  const onChangePage = (page: number) => {
    run({
      page,
      value: data?.name,
      advanceSearch: data?.advanceSearch,
    });
  };

  const onSearchCompany = (values: any, callback?: () => void) => {
    if (get(values, 'type') === 'enter') refCancelRequest.current = true;

    run({
      value: values.name,
      page: 1,
      advanceSearch: values?.advanceSearch,
    });

    if (callback) callback();
  };

  const onReloadCompanyData = () => {
    run({
      page: data?.current || 1,
    });
  };

  useMount(() => {
    run({
      page: data?.current || 1,
      value: data?.name,
      advanceSearch: data?.advanceSearch,
    });
  });

  return {
    data,
    loading,
    run,
    onChangePage,
    onSearchCompany,
    refresh,
    onReloadCompanyData,

    companies,
    requestSearchCompaniesSuggestion,
    onResetCompaniesSuggestion,
    onLoadMoreCompanies,
    onSearchCompaniesDebounce,
  };
};
