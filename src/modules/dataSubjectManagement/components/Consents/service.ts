import { useMount, useRequest } from 'ahooks';
import { message } from 'antd';
import dayjs from 'dayjs';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { useRef, useState } from 'react';
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

const getSuggestionConsents = async (userId: any, search: string, page = 1, prevValue = []) => {
  const params = {
    keyword: search,
    userId: userId,
    limit: 10,
    page,
  };

  const res: any = await ApiUtils.fetch(API_PATH.CONSENTS, params);

  const dataUnique = res?.content?.data?.map((v: any, idx: any) => ({
    id: idx,
    name: v?.app_name,
  }));

  return {
    data: dataUnique,
    isLoadMore: +res?.content?.metadata?.currentPage < +res?.content?.metadata?.lastPage,
    currentPage: +res?.content?.metadata?.currentPage,
    value: search,
  };
};

export const useConsent = ({ userId }: { userId: number }) => {
  const refCancelRequest: any = useRef(false);

  const [consentSuggest, setConsentSuggest] = useState<{
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
    async (value: string, page = 1, isLoadMore = false) => {
      if (refCancelRequest.current) throw new Error('Cancel Request');

      return getSuggestionConsents(userId, value, page);
    },
    {
      manual: true,
      refreshDeps: [refCancelRequest.current],
      onError: (err: any) => {
        refCancelRequest.current = false;
      },
      onSuccess: (r: any, params) => {
        const isLoadMore = params[2];

        setConsentSuggest((prev) => {
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

  const onResetSuggestionConsents = () => {
    setConsentSuggest({
      data: [],
      isLoadMore: false,
      currentPage: 1,
      value: '',
    });
  };

  const onLoadMoreSuggestionConsents = () => {
    requestSuggestionConsents.run(consentSuggest.value, consentSuggest.currentPage + 1, true);
  };

  const onSuggestionConsentsDebounce = debounce(async (value: string, callback: any) => {
    if (value?.length < 3) return;

    await requestSuggestionConsents.runAsync(value, 1, false);
    if (callback) callback();
  }, 350);

  const onChange = (current: number) => {
    run({ search: data.keyword, page: current, userId });
  };

  const onSearchConsent = async (search: string, callback?: any) => {
    refCancelRequest.current = true;
    await runAsync({ search, page: 1, userId });

    if (callback) callback();
    setTimeout(() => {
      refCancelRequest.current = false;
    }, 500);
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
    suggestionConsents: consentSuggest,
    onSuggestionConsentsDebounce,
    onLoadMoreSuggestionConsents,
    onResetSuggestionConsents,
  };
};
