/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMount, useRequest } from 'ahooks';
import dayjs from 'dayjs';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { useRef, useState } from 'react';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';
import { formatIdSubjectHistory } from 'utils/common.utils';

const getListCaseManagementService = async (values: any): Promise<any> => {
  const params: any = {
    userId: 1,
    limit: 10,
    isEqualSearch: !!values?.isEqualSearch,
    page: values?.page || 1,
    searchString: values.searchString || '',
    assignTo: '',
    advanceSearch: values?.advanceSearch,
  };

  const response: any = await ApiUtils.post(API_PATH.GET_LIST_CASE_MANAGEMENT, params);

  const current = response?.content?.metadata?.currentPage || 1;

  return {
    total: response?.content?.metadata?.total || 0,
    current: +response?.content?.metadata?.currentPage || 1,
    pageSize: +response?.content?.metadata?.itemPage || 10,
    data:
      response?.content?.data?.map((item: any, idx: number) => ({
        ...item,
        key: `${item?.id}`,
        noId: formatIdSubjectHistory(current, idx, item.action, item.id, item.createdAt),
        description: item?.description,
        assignTo: item?.assignTo,
        caseStatus: item?.status,
        createdDate: dayjs(item?.createdAt).format('MMM DD, YYYY'),
        companyName: item?.__companyInfo__?.nameEN,
      })) || [],
    searchString: params?.searchString || '',
    isEqualSearch: params?.isEqualSearch || '',
    advanceSearch: params['advanceSearch'],
  };
};

const getSuggestionCase = async (value: string, page: number) => {
  const params = {
    searchString: value,
    limit: 10,
    page: page || 1,
  };
  const res: any = await ApiUtils.fetch(API_PATH.SEARCH_CASE_AUTOCOMPLETE, params);

  return {
    data: res?.content?.data?.map((v: any, idx: number) => ({ id: idx, name: v })),
    isLoadMore: +res?.content?.metadata?.currentPage < +res?.content?.metadata?.lastPage,
    currentPage: +res?.content?.metadata?.currentPage,
    value,
  };
};

const MIN_SEARCH_USER = 3;

const useSearchCase = () => {
  const refCancelRequest = useRef(false);

  const [users, setUsers] = useState<{
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
      getListCaseManagementService({ searchString: value, isEqualSearch, page, advanceSearch }),
    {
      manual: true,
      cacheKey: 'search-case-management',
    },
  );

  const reqSearchCaseSuggestion = useRequest(
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
      return getSuggestionCase(value, page);
    },
    {
      manual: true,
      refreshDeps: [refCancelRequest.current],
      onError: () => {
        refCancelRequest.current = false;
      },
      onSuccess: (r: any, params) => {
        const isLoadMore = params[0].isLoadMore;

        setUsers((prev) => {
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

  const onSearchCaseSuggestionDebounce = debounce(async (values: any[], callback: () => void) => {
    const value = get(values, '[0].value', '');
    if (value?.length < MIN_SEARCH_USER) return;

    await reqSearchCaseSuggestion.runAsync({ value, page: 1, isLoadMore: false });
    if (callback) callback();
  }, 350);

  const onChangePage = (page: number) => {
    run({
      page,
      value: data?.searchString,
      isEqualSearch: data?.isEqualSearch,
      advanceSearch: data?.advanceSearch,
    });
  };

  const onSearchCaseSuggestion = (values: { searchString: string }, callback: () => void) => {
    if (get(values, 'type') === 'enter') refCancelRequest.current = true;

    run({
      value: values.searchString,
      page: 1,
      isLoadMore: false,
      isEqualSearch: false,
    });
    if (callback) callback();
  };

  const onResetUsers = () => {
    setUsers({
      data: [],
      isLoadMore: false,
      currentPage: 1,
      value: '',
    });
  };

  const onLoadMoreUsers = () => {
    reqSearchCaseSuggestion.run({
      value: users.value,
      page: users.currentPage + 1,
      isLoadMore: true,
    });
  };

  useMount(() => {
    run({
      page: data?.current || 1,
      value: data?.searchString,
      isEqualSearch: data?.isEqualSearch,
      advanceSearch: data?.advanceSearch,
    });
  });

  return {
    data,
    loading,
    onSearchCaseList: run,
    onChangePage,
    onSearchCaseSuggestion,
    reqSearchCaseSuggestion,
    onResetUsers,
    onLoadMoreUsers,
    onSearchCaseSuggestionDebounce,
    users,
  };
};

export { useSearchCase };
