import cloneDeep from 'lodash/cloneDeep';
import ApiUtils from 'utils/api/api.utils';
import { useMount, useRequest } from 'ahooks';
import { flattenDeep, get, groupBy, isArray } from 'lodash';
import { API_PATH } from 'utils/api/constant';
import { message } from 'antd';

const PAGE_SIZE = 6;

export const getContentService = async ({
  search,
  userId,
  page
}: {
  search?: string | undefined;
  userId: number;
  page: number;
}): Promise<any> => {
  const params = {
    keyword: search,
    userId: userId,
    limit: PAGE_SIZE,
    page: page || 1
  };

  const r: any = await ApiUtils.fetch(API_PATH.CONSENTS, params);

  const listData =
    r?.content?.data?.map((item: any) => {
      if (!isArray(item?.myConsent) && item?.myConsent) {
        return {
          ...item,
          myConsent: [item?.myConsent]
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
        lastUpdated: 'Date',
        version: 'V1.0',
        status: i % 2 === 0 ? 'Accepted' : 'Not Accepted',
        description: get(consents, '[0].consentData.title', ''),
        list: consents?.map((consent: any, idx: number) => ({
          id: consent.id,
          title: get(consent, 'consentData.consentName', ''),
          description: get(consent, 'consentData.content', ''),
          value: `${get(consent, 'consentData.consentName', '')}@${consent?.id}`,
          selected: consent?.myConsent?.reduce((acc: any, i: any) => {
            return {
              ...acc,
              [`${i?.key}@${consent?.id}`]: i?.value
            };
          }, {})
        }))
      }
    };
  });
  formatConsents = formatConsents?.map((v: any) => {
    const defaultValue = v?.dataConsent?.list?.reduce((acc: any, v: any) => {
      const selected = v?.selected || {};
      return {
        ...acc,
        ...selected
      };
    }, {});
    return {
      ...v,
      defaultValue
    };
  });

  return {
    total: r?.content?.metadata?.total || 0,
    current: +r?.content?.metadata?.currentPage || 1,
    pageSize: +r?.content?.metadata?.itemPage || 6,
    data: formatConsents,
    listData
  };
};

export const updateConsent = async ({ userId, content, ConsentList }: any) => {
  const newConsent: any = {
    insert: [],
    update: [],
    delete: []
  };

  const consentHasChecked = ConsentList?.filter((v: any) => v?.myConsent?.length > 0);

  let consentHasChecked2 = cloneDeep(consentHasChecked);
  const valuesChecked = flattenDeep(Object.values(content))?.map((v) => v);

  valuesChecked?.forEach((v: any) => {
    const [key, consentId] = v?.split('@') || [];
    const isExistChecked = consentHasChecked?.find((i: any) => i?.key === key);
    consentHasChecked2 = consentHasChecked2?.filter((i: any) => i?.key !== key);

    if (!isExistChecked && consentId) {
      newConsent.insert.push({
        consentId: Number(consentId),
        data: {
          key: `${key}`,
          value: 'true'
        }
      });
    } else if (consentId) {
      newConsent.update.push({
        consentId: Number(consentId),
        data: {
          key: `${key}`,
          value: 'true'
        }
      });
    }
  });

  newConsent.delete = consentHasChecked2.map((v: any) => {
    return {
      consentId: Number(v?.id)
    };
  });

  const body = {
    userId: userId,
    content: newConsent
  };

  return ApiUtils.post(API_PATH.OPT_OUT_IN, body);
};

export const useConsent = ({ userId }: { userId: number }) => {
  const { data, loading, run, refresh } = useRequest(getContentService, {
    manual: true
  });

  const reqUpdateConsent = useRequest(updateConsent, {
    manual: true,
    onSuccess: (r) => {
      message.success('Update Consent Success');
    },
    onError: () => {
      message.error('Update Consent Fail');
    }
  });

  useMount(() => {
    run({ page: 1, userId });
  });

  const onChange = (current: number) => {
    run({ page: current, userId });
  };

  const onSearchConsent = (search: string) => {
    run({ search, page: 1, userId });
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
    loadingUpdateConsent: reqUpdateConsent.loading
  };
};
