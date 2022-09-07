/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMount, useRequest } from 'ahooks';
import { message } from 'antd';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { useRef, useState } from 'react';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';

const PAGE_SIZE = 10;

type TConsentService = {
  search?: string;
  userId: string;
  page: number;
  applicationName?: any;
};

function capitalizeFirstLetter(string: string) {
  if (!string) return;
  const stringLowercase = string?.toLowerCase();
  return stringLowercase.charAt(0).toUpperCase() + stringLowercase.slice(1);
}
export const getConsentService = async (
  { search, userId, applicationName, page }: TConsentService,
  onlyView = false,
): Promise<any> => {
  const params = {
    keyword: search,
    businessProfileID: userId,
    limit: PAGE_SIZE,
    page: page || 1,

    applicationName: applicationName,
    language: 'en',
    isFilterActive: false,
  };
  if (!applicationName) {
    return;
  }
  const PATH = !onlyView ? API_PATH.CONSENTS : API_PATH.CONSENT_ONLY_VIEW;
  const r: any = await ApiUtils.fetch(PATH, params);

  const formatConsents = r?.content?.data?.map((item: any) => {
    const appDes = item?.consents
      ?.map((consent: any) => get(consent, 'title', ''))
      ?.filter((v: any) => v)
      ?.join(', ');

    return {
      key: `${item?.app_name}`,
      name: item?.app_name,
      description: appDes || '',
      list: item?.consents?.map((consent: any) => {
        const val = {
          appName: consent.application,
          consentName: get(consent, 'consentName', ''),
          version: get(consent, 'version', ''),
          checked: get(consent, 'status', '') === 'active',
        };

        return {
          id: consent.consent_id,
          title: get(consent, 'consentName', ''),
          value: JSON.stringify(val),
          description: get(consent, 'content', ''),
          lastUpdated: '',
          version: `Version ${get(consent, 'version', '') || ''}`,
          status: capitalizeFirstLetter(get(consent, 'status', '') || 'draft'),
          selected: get(consent, 'status', '') === 'active',
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
  const newConsent: any = [];

  Object.keys(content)?.forEach((initialKey) => {
    const consentIniti = content[initialKey];
    const itemSelect = ConsentList?.find((it: any) => it?.name === initialKey);

    itemSelect?.list?.forEach((v: any) => {
      const isExist = consentIniti?.find((id: any) => id === v?.value);
      const parseVal = JSON.parse(v?.value);

      if (isExist && !v?.selected) {
        newConsent.push({
          consentName: parseVal?.consentName,
          version: parseVal?.version,
          flag: true,
        });
      }
      if (!isExist && v?.selected) {
        newConsent.push({
          consentName: parseVal?.consentName,
          version: parseVal?.version,
          flag: false,
        });
      }
    });
  });

  return newConsent;
};

export const updateConsent = async ({ userId, content, ConsentList }: any) => {
  const newConsent = getConsentsChecked({ content, ConsentList });

  const body = {
    businessProfileId: userId,
    application: 'sc',
    consents: newConsent,
  };

  // return ApiUtils.post(API_PATH.OPT_OUT_IN, body);
};

const getSuggestionConsents = async (userId: any, search: string, page = 1) => {
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

export const useConsent = ({
  userId,
  onlyView = false,
  applicationName,
}: {
  userId: string;
  onlyView?: boolean;
  applicationName?: any;
}) => {
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

  const { data, loading, run, runAsync, refresh } = useRequest(
    (values: any) => getConsentService(values, onlyView),
    {
      manual: true,
    },
  );

  const reqUpdateConsent = useRequest(updateConsent, {
    manual: true,
    onSuccess: () => {
      message.success('Update Consent Success');
    },
    onError: () => {
      message.error('Update Consent Fail');
    },
  });

  useMount(() => {
    run({ page: 1, userId, applicationName });
  });

  // suggestion consent
  const requestSuggestionConsents = useRequest(
    async (value: string, page = 1, _isLoadMore = false) => {
      if (refCancelRequest.current) throw new Error('Cancel Request');

      return getSuggestionConsents(userId, value, page);
    },
    {
      manual: true,
      refreshDeps: [refCancelRequest.current],
      onError: () => {
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
    run({ search: data.keyword, page: current, userId, applicationName });
  };

  const onSearchConsent = async (search: string, callback?: any) => {
    refCancelRequest.current = true;
    await runAsync({ search, page: 1, userId, applicationName });

    if (callback) callback();
    setTimeout(() => {
      refCancelRequest.current = false;
    }, 500);
  };

  const onSaveConsent = async (consent: any) => {
    if (Object.keys(consent).length === 0) return;

    await reqUpdateConsent.runAsync({
      userId,
      applicationName,
      content: consent,
      ConsentList: data?.listData,
    });
    // refresh();
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

export const useGenerateLink = (userId: any) => {
  return useRequest(
    async () => {
      const res: any = await ApiUtils.post(API_PATH.GENERATE_LINK, {
        businessProfileID: `${userId}`,
      });
      return `${window?.location?.origin}/${res?.content}` || '';
    },
    {
      manual: true,
    },
  );
};
