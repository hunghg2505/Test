import { useMount, useRequest } from 'ahooks';
import { message } from 'antd';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { ResponseBase } from 'utils/api/api.types';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';

interface IDetailConsent {
  name: string;
  consentId: string;
  application: any;
  productId: string;
  productName: string;
  service: any;
  status: string;
  version: string;
  content: string;
  title: string;
  expireOn?: string;
}

interface IEditConsent {
  name?: string;
  application?: any;
  productId?: string;
  productName?: string;
  service?: any;
  status?: string;
  version?: string;
  content?: string;
  title?: string;
  expireOn?: string;
}

const getConsentDetailService = async (id: string): Promise<IDetailConsent> => {
  const response: any = await ApiUtils.fetch(API_PATH.GET_DETAIL_CONSENT(id));

  return {
    name: response?.content?.data?.name,
    consentId: response?.content?.data?.consentId,
    application: response?.content?.data?.__application__,
    productId: response?.content?.data?.productId,
    productName: response?.content?.data?.productName,
    service: response?.content?.data?.__service__,
    status: response?.content?.data?.status,
    version: response?.content?.data?.version,
    content: response?.content?.data?.content,
    title: response?.content?.data?.title,
    expireOn: response?.content?.data?.expireOn,
  };
};

export const useConsentDetail = (id: string) => {
  return useRequest(async () => getConsentDetailService(id));
};

const updateConsentService = (id: string, body: IEditConsent) => {
  return ApiUtils.put<IEditConsent, ResponseBase<{ data: IDetailConsent }>>(
    API_PATH.UPDATE_CONSENT(id),
    body,
  );
};

export const useUpdateConsent = (id: string, onFinishSubmitForm: () => void) => {
  return useRequest(async (data: IEditConsent) => updateConsentService(id, data), {
    manual: true,
    onSuccess: () => {
      message.success('Edit Consent Success');
      onFinishSubmitForm();
    },
    onError: () => {
      message.error('Edit Consent Error');
      onFinishSubmitForm();
    },
  });
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
        appId: item?.appId,
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