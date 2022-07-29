import { useMount, useRequest } from 'ahooks';
import { message } from 'antd';
import { debounce, get } from 'lodash';
import { useNavigate } from 'react-router-dom';
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
}: {
  name?: string | undefined;
  page: number;
}) => {
  const response: any = await ApiUtils.fetch(API_PATH.GET_LIST_APPLICATION, {
    name,
    limit: 10,
    page: page || 1,
  });

  const current = +response?.content?.metadata?.currentPage || 1;

  return {
    total: response?.content?.metadata?.total || 0,
    current: current,
    pageSize: +response?.content?.metadata?.itemPage || 10,
    data:
      response?.content?.data?.map((item: any) => ({
        id: item?.id,
        appName: item?.appName,
      })) || [],
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
    if (!Object.values(values)?.filter((v) => v).length) return;

    await runAsync({ ...values, page: 1 });
  }, 350);

  useMount(() => {
    run({ page: 1 });
  });

  const onChangePage = (page: number) => {
    run({ name: data?.name, page });
  };

  return {
    data,
    loading,
    onSearchApplicationDebounce,
    onChangePage,
    run,
  };
};

const getListService = async ({ name, page }: { name?: string | undefined; page: number }) => {
  const response: any = await ApiUtils.fetch(API_PATH.GET_LIST_SERVICE, {
    name,
    limit: 10,
    page: page || 1,
  });

  const current = +response?.content?.metadata?.currentPage || 1;

  return {
    total: response?.content?.metadata?.total || 0,
    current: current,
    pageSize: +response?.content?.metadata?.itemPage || 10,
    data:
      response?.content?.data?.map((item: any) => ({
        id: item?.id,
        name: item?.name,
      })) || [],
    name,
  };
};

export const useGetListService = () => {
  const { data, loading, run, runAsync } = useRequest((values) => getListService(values), {
    manual: true,
  });

  const onSearchServiceDebounce = debounce(async (values = {}) => {
    if (!Object.values(values)?.filter((v) => v).length) return;

    await runAsync({ ...values, page: 1 });
  }, 350);

  useMount(() => {
    run({ page: 1 });
  });

  const onChangePage = (page: number) => {
    run({ name: data?.name, page });
  };

  return {
    data,
    loading,
    onSearchServiceDebounce,
    onChangePage,
    run,
  };
};
