import { API_PATH } from 'utils/api/constant';
import { useMount, useRequest, useUpdateEffect } from 'ahooks';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import max from 'lodash/max';
import ApiUtils from 'utils/api/api.utils';
import dayjs from 'dayjs';
import { getConsentService } from 'modules/dataSubjectManagement/components/Consents/service';

const PAGE_SIZE = 10;

// const getConsents = async (caseId: string) => {
//   const res: any = await ApiUtils.fetch(API_PATH.GET_CASE_CONSENT, {
//     caseId,
//   });

//   const listConsent = res?.content?.data?.map((v: any) => ({
//     id: v?.id,
//     updatedAt: v?.updatedAt,
//     consentData: v?.content,
//   }));

//   let formatConsents: any = groupBy(listConsent, 'consentData.application');

//   formatConsents = Object.keys(formatConsents).map((consentKey, i) => {
//     const consents: any[] = formatConsents[consentKey];

//     return {
//       key: `${consentKey}`,
//       dataConsent: {
//         name: consentKey,
//         lastUpdated: dayjs(max(consents.map((consent) => consent?.updatedAt))).format('DD/MM/YYYY'),
//         version: 'V1.0',
//         status: i % 2 === 0 ? 'Accepted' : 'Not Accepted',
//         description: get(consents, '[0].consentData.title', ''),
//         list: consents?.map((consent: any, idx: number) => ({
//           id: consent.id,
//           title: get(consent, 'consentData.consentName', ''),
//           description: get(consent, 'consentData.content', ''),
//           value: `${get(consent, 'consentData.consentName', '')}@${consent?.id}`,
//           lastUpdated: dayjs(get(consent, 'updatedAt', '')).format('MMM DD, YYYY'),
//           version: `Version ${get(consent, 'consentData.version', '')}`,
//           status: getStatusConstent(get(consent, 'updatedAt', '')),
//         })),
//       },
//     };
//   });

//   return {
//     total: res?.content?.metadata?.total || 0,
//     current: +res?.content?.metadata?.currentPage || 1,
//     pageSize: PAGE_SIZE,
//     data: formatConsents,
//   };
// };

const useConsentList = ({ userId }: { userId: number }) => {
  const { data, loading, run, runAsync } = useRequest(getConsentService, {
    manual: true,
  });

  const onChange = (current: number) => {
    run({ search: data.keyword, page: current, userId });
  };

  const onSearchConsent = async (search: string, callback?: any) => {
    await runAsync({ search, page: 1, userId });

    if (callback) callback();
  };

  useUpdateEffect(() => {
    run({ page: 1, userId });
  }, [userId]);

  return {
    data,
    loading,
    onChange,
    onSearchConsent,
  };
};

export { useConsentList };
