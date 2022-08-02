import { useMount, useRequest } from 'ahooks';
import { message } from 'antd';
import debounce from 'lodash/debounce';
import { ResponseBase } from 'utils/api/api.types';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';

interface ICreateConsent {
  name: string;
  consentId: string;
  applicationId: string;
  productId: string;
  productName: string;
  serviceId: string;
  status: 'draft' | 'published';
  title: string;
  version: string;
  content: string;
  expireOn?: Date;
}

interface ICreateConsentResponse {
  code: number;
  info: string;
  content: {
    data: ICreateConsent;
  };
}

const createConsentService = async (body: ICreateConsent) => {
  return ApiUtils.post<ICreateConsent, ResponseBase<ICreateConsentResponse>>(
    API_PATH.CONSENT_MANAGEMENT_BASE_URL,
    body,
  );
};

export const useCreateConsent = (onFinishSubmitForm: () => void) => {
  return useRequest(
    async (data: ICreateConsent) => {
      return createConsentService(data);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('Create Case Success');
        onFinishSubmitForm();
      },
      onError: () => {
        message.error('Create Case Error');
        onFinishSubmitForm();
      },
    },
  );
};

const getListApplicationService = async ({
  name,
  page,
  prevList = [],
}: {
  name?: string | undefined;
  page: number;
  prevList: any[];
}) => {
  const response: any = await ApiUtils.fetch(API_PATH.GET_LIST_APPLICATION, {
    name: name || '',
    limit: 10,
    page: page || 1,
  });

  const current = +response?.content?.metadata?.currentPage || 1;

  const currentData =
    response?.content?.data?.map((item: any) => ({
      id: item?.id,
      appName: item?.appName,
    })) || [];

  return {
    total: response?.content?.metadata?.total || 0,
    current: current || 1,
    pageSize: +response?.content?.metadata?.itemPage || 10,
    data: [...prevList, ...currentData],
    isLoadMore: +response?.content?.metadata?.currentPage < +response?.content?.metadata?.lastPage,
    name,
  };
};

export const useGetListApplication = () => {
  const { data, loading, run, runAsync } = useRequest(
    (values) => getListApplicationService(values),
    {
      manual: true,
    },
  );

  const onSearchApplicationDebounce = debounce(async (values = {}) => {
    await runAsync({ name: values?.values || values, page: 1, prevList: [] });
  }, 350);

  useMount(() => {
    run({ page: 1, prevList: [] });
  });

  const onLoadMore = () => {
    run({ name: data?.name, page: (data?.current || 1) + 1, prevList: data?.data });
  };

  const onReset = () => {
    console.log('reset data');
  };

  return {
    data,
    loading,
    onSearchApplicationDebounce,
    onLoadMore,
    isLoadMore: data?.isLoadMore,
  };
};

const getListService = async ({
  name,
  page,
  prevList = [],
}: {
  name?: string | undefined;
  page: number;
  prevList: any[];
}) => {
  const response: any = await ApiUtils.fetch(API_PATH.GET_LIST_SERVICE, {
    name,
    limit: 10,
    page: page || 1,
  });

  const current = +response?.content?.metadata?.currentPage || 1;
  const currentData =
    response?.content?.data?.map((item: any) => ({
      id: item?.id,
      appName: item?.name,
    })) || [];

  return {
    total: response?.content?.metadata?.total || 0,
    current: current,
    pageSize: +response?.content?.metadata?.itemPage || 10,
    data: [...prevList, ...currentData],
    isLoadMore: +response?.content?.metadata?.currentPage < +response?.content?.metadata?.lastPage,
    name,
  };
};

export const useGetListService = () => {
  const { data, loading, run, runAsync } = useRequest((values) => getListService(values), {
    manual: true,
  });

  const onSearchServiceDebounce = debounce(async (values = {}) => {
    await runAsync({ name: values?.values || values, page: 1, prevList: [] });
  }, 350);

  useMount(() => {
    run({ page: 1 });
  });

  const onLoadMore = () => {
    run({ name: data?.name, page: (data?.current || 1) + 1, prevList: data?.data });
  };

  const onReset = () => {
    console.log('reset data');
  };

  return {
    data,
    loading,
    onSearchServiceDebounce,
    onLoadMore,
    isLoadMore: data?.isLoadMore,
  };
};
