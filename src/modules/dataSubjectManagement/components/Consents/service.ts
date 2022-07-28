import { useMount, useRequest } from 'ahooks';
import { message } from 'antd';
import dayjs from 'dayjs';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import uniqWith from 'lodash/uniqWith';
import { useRef } from 'react';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';

const PAGE_SIZE = 10;

export const getStatusConstent = (lastUpdated: string) => {
  const date1 = dayjs('2022-05-19');
  const date2 = dayjs(lastUpdated);

  return date1.diff(date2) >= 0 ? 'Published' : 'Draft';
};

export const getConsentService = async ({
  search,
  userId,
  page,
}: {
  search?: string | undefined;
  userId: number;
  page: number;
}): Promise<any> => {
  const params = {
    keyword: search,
    userId: userId,
    limit: PAGE_SIZE,
    page: page || 1,
  };

  const r: any = await ApiUtils.fetch(API_PATH.CONSENTS, params);

  const formatConsents = r?.content?.data?.map((item: any, idx: number) => {
    return {
      key: `${item?.app_name}`,
      name: item?.app_name,
      lastUpdated: dayjs().format('DD/MM/YYYY'),
      version: 'V1.0',
      status: idx % 2 === 0 ? 'Accepted' : 'Not Accepted',
      description: 'Information storage and access, Personalisation, Data Reports',
      list: item?.consents?.map((consent: any) => {
        return {
          id: consent.consent_id,
          title: get(consent, 'name', ''),
          value: `${get(consent, 'name', '')}@${consent.consent_id}`,
          description: get(consent, 'content', ''),
          selected: !!consent?.my_consent_id,
        };
      }),
    };
  });

  return {
    total: r?.content?.metadata?.total || 0,
    current: +r?.content?.metadata?.currentPage || 1,
    pageSize: PAGE_SIZE,
    data: formatConsents,
    keyword: search,
    listData: formatConsents,
  };
};

const getConsentsChecked = ({ content, ConsentList }: any) => {
  const newConsent: any = {
    insert: [],
    update: [],
    delete: [],
  };

  Object.keys(content)?.forEach((initialKey) => {
    const consentIniti = content[initialKey];
    const itemSelect = ConsentList?.find((it: any) => it?.name === initialKey);
    itemSelect?.list?.forEach((v: any) => {
      const isExist = consentIniti?.find((id: any) => id === v?.value);
      if (isExist && !v?.selected) {
        newConsent.insert.push({
          consentId: Number(v?.id),
          data: [
            {
              key: `${v?.title}`,
              value: 'true',
            },
          ],
        });
      }
      if (!isExist && v?.selected) {
        newConsent.delete.push({
          consentId: Number(v?.id),
        });
      }
    });
  });

  return newConsent;
};

export const updateConsent = async ({ userId, content, ConsentList }: any) => {
  const newConsent = getConsentsChecked({ content, ConsentList });

  const body = {
    userId: userId,
    content: newConsent,
  };

  return ApiUtils.post(API_PATH.OPT_OUT_IN, body);
};

const getSuggestionConsents = async (userId: any, search: string, page = 1) => {
  const params = {
    keyword: search,
    userId: userId,
    limit: 1000,
    page,
  };

  const res: any = await ApiUtils.fetch(API_PATH.CONSENTS, params);

  let dataUnique = res?.content?.data?.map((v: any) => v?.consentData?.application);

  dataUnique = uniqWith(dataUnique, isEqual)?.map((item, idx) => ({ id: idx, name: item }));
  const formatData = {
    list: dataUnique,
    current: 1,
    total: Math.ceil(dataUnique.length / PAGE_SIZE),
  };

  return {
    ...formatData,
    total: Math.ceil(formatData.list.length / PAGE_SIZE),
    data:
      formatData?.list?.slice(
        (formatData.current - 1) * PAGE_SIZE,
        (formatData.current - 1) * PAGE_SIZE + PAGE_SIZE,
      ) || [],
    isLoadMore: formatData.current < formatData.total,
  };
};

export const useConsent = ({ userId }: { userId: number }) => {
  const refCancelRequest: any = useRef(false);

  const { data, loading, run, runAsync, refresh } = useRequest(getConsentService, {
    manual: true,
  });

  const reqUpdateConsent = useRequest(updateConsent, {
    manual: true,
    onSuccess: (r) => {
      message.success('Update Consent Success');
    },
    onError: () => {
      message.error('Update Consent Fail');
    },
  });

  useMount(() => {
    run({ page: 1, userId });
  });

  // suggestion consent
  const requestSuggestionConsents = useRequest(
    async (value: string, page = 1) => {
      if (refCancelRequest.current) throw new Error('Cancel Request');

      return getSuggestionConsents(userId, value, page);
    },
    {
      manual: true,
    },
  );

  const onResetSuggestionConsents = () => {
    requestSuggestionConsents.mutate({
      current: 1,
      data: [],
      list: [],
      total: 0,
      isLoadMore: false,
    });
  };

  const onLoadMoreSuggestionConsents = () => {
    const data: any = requestSuggestionConsents.data;
    const prevData = data?.data || [];
    const current = data?.current + 1 || 0;
    const nextData =
      data?.list?.slice((current - 1) * PAGE_SIZE, (current - 1) * PAGE_SIZE + PAGE_SIZE) || [];

    requestSuggestionConsents.mutate({
      ...data,
      current: current,
      isLoadMore: current < data?.total,
      data: [...prevData, ...nextData],
    });
  };

  const onSuggestionConsentsDebounce = debounce(async (value: string, callback: any) => {
    if (value?.length < 3) return;

    await requestSuggestionConsents.runAsync(value, 1);
    if (callback) callback();
  }, 350);

  const onChange = (current: number) => {
    run({ search: data.keyword, page: current, userId });
  };

  const onSearchConsent = async (search: string, callback?: any) => {
    refCancelRequest.current = true;
    await runAsync({ search, page: 1, userId });

    if (callback) callback();
    refCancelRequest.current = false;
  };

  const onSaveConsent = async (consent: any) => {
    if (Object.keys(consent).length === 0) return;

    await reqUpdateConsent.runAsync({
      userId,
      content: consent,
      ConsentList: data?.listData,
    });
    refresh();
  };

  return {
    data,
    loading,
    onChange,
    onSearchConsent,
    onSaveConsent,
    loadingUpdateConsent: reqUpdateConsent.loading,
    suggestionConsents: requestSuggestionConsents.data,
    onSuggestionConsentsDebounce,
    onLoadMoreSuggestionConsents,
    onResetSuggestionConsents,
  };
};
