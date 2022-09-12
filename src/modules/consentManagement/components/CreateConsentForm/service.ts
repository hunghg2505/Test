import { useMount, useRequest } from 'ahooks';
import { message } from 'antd';
import { GENERAL_CONSENT_MANAGEMENT_LIST } from 'constants/common.constants';
import debounce from 'lodash/debounce';
import { ResponseBase } from 'utils/api/api.types';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH, GENERAL_CONFIG_CONSENT_BASE_URL } from 'utils/api/constant';

interface ICreateConsent {
  consentName: string;
  consentId: string;
  applicationId: string;
  idProduct: number;
  productName: string;
  serviceId: string;
  idStatus: number;
  titleEn: string;
  titleTh: string;
  version: string;
  contentTh: string;
  contentEn: string;
  expireOn?: Date;
  activationDate: Date;
  userRoleMap: string;
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
        message.success('Create Consent Success');
        onFinishSubmitForm();
      },
      onError: () => {
        message.error('Create Consent Error');
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
  name?: string;
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
      appName: item?.name,
      roleMap: item?.roleMap,
      value: `${item?.name}-${item?.roleMap}`,
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
  name?: string;
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

  return {
    data,
    loading,
    onSearchServiceDebounce,
    onLoadMore,
    isLoadMore: data?.isLoadMore,
  };
};

const getDataDropDownService = async () => {
  const responseConsent: any = await Promise.all(
    GENERAL_CONSENT_MANAGEMENT_LIST.map((type: string) =>
      ApiUtils.fetch(GENERAL_CONFIG_CONSENT_BASE_URL, { type }),
    ),
  );

  return {
    productData: responseConsent[0]?.content?.data,
    serviceData: responseConsent[1]?.content?.data,
    statusData: responseConsent[2]?.content?.data,
  };
};

export const useGetDataDropdownConsent = () => {
  const { data } = useRequest(getDataDropDownService);

  return { data };
};
