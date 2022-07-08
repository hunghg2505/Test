import { useRef } from 'react';
import { useMount, useRequest } from 'ahooks';
import { message } from 'antd';
import debounce from 'lodash/debounce';
import flattenDeep from 'lodash/flattenDeep';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import uniqWith from 'lodash/uniqWith';
import max from 'lodash/max';
import ApiUtils from 'utils/api/api.utils';
import dayjs from 'dayjs';
import { API_PATH } from 'utils/api/constant';

const PAGE_SIZE = 10;

const getStatusConstent = (lastUpdated: string) => {
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

  const listData =
    r?.content?.data?.map((item: any) => {
      if (!isArray(item?.myConsent) && item?.myConsent) {
        return {
          ...item,
          myConsent: [item?.myConsent],
        };
      }
      return item;
    }) || [];

  let formatConsents: any = groupBy(listData, 'consentData.application');

  formatConsents = Object.keys(formatConsents).map((consentKey, i) => {
    const consents: any[] = formatConsents[consentKey];

    return {
      key: `${consentKey}`,
      dataConsent: {
        name: consentKey,
        lastUpdated: dayjs(max(consents.map((consent) => consent?.updatedAt))).format('DD/MM/YYYY'),
        version: 'V1.0',
        status: i % 2 === 0 ? 'Accepted' : 'Not Accepted',
        description: get(consents, '[0].consentData.title', ''),
        list: consents?.map((consent: any, idx: number) => ({
          id: consent.id,
          title: get(consent, 'consentData.consentName', ''),
          description: get(consent, 'consentData.content', ''),
          value: `${get(consent, 'consentData.consentName', '')}@${consent?.id}`,
          lastUpdated: dayjs(get(consent, 'updatedAt', '')).format('MMM DD, YYYY'),
          version: `Version ${get(consent, 'consentData.version', '')}`,
          status: getStatusConstent(get(consent, 'updatedAt', '')),
          selected: consent?.myConsent?.reduce((acc: any, i: any) => {
            return {
              ...acc,
              [`${i?.key}@${consent?.id}`]: i?.value,
            };
          }, {}),
        })),
      },
    };
  });
  formatConsents = formatConsents?.map((v: any) => {
    const defaultValue = v?.dataConsent?.list?.reduce((acc: any, v: any) => {
      const selected = v?.selected || {};
      return {
        ...acc,
        ...selected,
      };
    }, {});
    return {
      ...v,
      defaultValue,
    };
  });

  return {
    total: r?.content?.metadata?.total || 0,
    current: +r?.content?.metadata?.currentPage || 1,
    pageSize: PAGE_SIZE,
    data: formatConsents,
    keyword: search,
    listData,
  };
};

export const updateConsent = async ({ userId, content, ConsentList }: any) => {
  const newConsent: any = {
    insert: [],
    update: [],
    delete: [],
  };

  const consentHasChecked = ConsentList?.filter((v: any) => v?.myConsent?.length > 0);
  const valuesChecked = flattenDeep(Object.values(content))?.map((v) => v);

  valuesChecked?.forEach((consentSelected: string) => {
    const [key, consentId] = consentSelected?.split('@') || [];

    newConsent.insert.push({
      consentId: Number(consentId),
      data: [
        {
          key: `${key}`,
          value: 'true',
        },
      ],
    });
  });

  consentHasChecked?.forEach((element: any) => {
    const isExistInsert = newConsent.insert?.find(
      (v: any) => `${v?.consentId}` === `${element?.id}`,
    );
    if (!isExistInsert) {
      newConsent.delete.push({
        consentId: Number(element?.id),
      });
    }
  });

  newConsent.insert = newConsent.insert?.filter((item: any) => {
    const isExistOnList = consentHasChecked?.find((v: any) => `${v.id}` === `${item.consentId}`);
    if (isExistOnList) return false;
    return true;
  });

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

    await reqUpdateConsent.runAsync({ userId, content: consent, ConsentList: data?.listData });
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
