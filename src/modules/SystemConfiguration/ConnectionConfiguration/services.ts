import { useMount, useRequest } from 'ahooks';
import dayjs from 'dayjs';
import get from 'lodash/get';
import { useRef } from 'react';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';

// const getCompanies = async () => {
//   return {
//     list: [
//       {
//         id: 'c1',
//         companyName: 'ABC',
//         createdDate: '24/5/2022',
//         applications: [
//           {
//             id: 'a1',
//             applicationName: 'Application Name',
//             applicationList: [
//               {
//                 id: 'l1',
//                 name: 'API Endpoints',
//                 info: {
//                   linkUrl: 'https://',
//                   method: '',
//                   parameters: 'AA',
//                   response: 'Response',
//                   key: 'KEY',
//                 },
//               },
//               {
//                 id: 'l2',
//                 name: 'User profile detail',
//                 info: {
//                   linkUrl: 'https://',
//                   method: '',
//                   parameters: 'AA',
//                   response: 'Response',
//                   key: 'KEY',
//                 },
//               },
//               {
//                 id: 'l3',
//                 name: 'search user profile',
//                 info: {
//                   linkUrl: 'https://',
//                   method: '',
//                   parameters: 'AA',
//                   response: 'Response',
//                   key: 'KEY',
//                 },
//               },
//               {
//                 id: 'l4',
//                 name: 'handle opt-in/opt-out',
//                 info: {
//                   linkUrl: 'https://',
//                   method: '',
//                   parameters: 'AA',
//                   response: 'Response',
//                   key: 'KEY',
//                 },
//               },
//             ],
//           },
//         ],
//       },

//       {
//         id: 'c2',
//         companyName: 'XYZ',
//         createdDate: '24/5/2022',
//         applications: [
//           {
//             id: 'a2',
//             applicationName: 'Application Name',
//             applicationList: [
//               {
//                 id: 'l11',
//                 name: 'API Endpoints',
//                 info: {
//                   linkUrl: 'https://',
//                   method: '',
//                   parameters: 'AA',
//                   response: 'Response',
//                   key: 'KEY',
//                 },
//               },
//               {
//                 id: 'l22',
//                 name: 'User profile detail',
//                 info: {
//                   linkUrl: 'https://',
//                   method: '',
//                   parameters: 'AA',
//                   response: 'Response',
//                   key: 'KEY',
//                 },
//               },
//               {
//                 id: 'l33',
//                 name: 'search user profile',
//                 info: {
//                   linkUrl: 'https://',
//                   method: '',
//                   parameters: 'AA',
//                   response: 'Response',
//                   key: 'KEY',
//                 },
//               },
//               {
//                 id: 'l44',
//                 name: 'handle opt-in/opt-out',
//                 info: {
//                   linkUrl: 'https://',
//                   method: '',
//                   parameters: 'AA',
//                   response: 'Response',
//                   key: 'KEY',
//                 },
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   };
// };

const getListCompanyService = async (values: any): Promise<any> => {
  const params: any = {
    limit: 10,
    page: values?.page || 1,
    name: values.name || '',
    advanceSearch: values?.advanceSearch,
  };

  const response: any = await ApiUtils.post(API_PATH.GET_LIST_COMPANY, params);

  return {
    total: response?.content?.metadata?.total || 0,
    current: +response?.content?.metadata?.currentPage || 1,
    pageSize: +response?.content?.metadata?.itemPage || 10,
    data:
      response?.content?.data?.map((item: any) => ({
        ...item,
        key: `${item?.id}`,
        createdDate: dayjs(item?.createdAt).format('DD/MM/YYYY'),
      })) || [],
    name: params?.name || '',
    advanceSearch: params['advanceSearch'],
  };
};

export const useCompanies = () => {
  const refCancelRequest = useRef(false);
  const { data, loading, run, refresh } = useRequest(
    ({ value, page, advanceSearch }: any) =>
      getListCompanyService({ name: value, page, advanceSearch }),
    {
      manual: true,
      cacheKey: 'company-management',
    },
  );

  const onChangePage = (page: number) => {
    run({
      page,
      value: data?.name,
      advanceSearch: data?.advanceSearch,
    });
  };

  const onSearchCompany = (values: any, callback?: () => void) => {
    if (get(values, 'type') === 'enter') refCancelRequest.current = true;

    run({
      value: values.name,
      page: 1,
      advanceSearch: values?.advanceSearch,
    });
    if (callback) callback();
  };

  useMount(() => {
    run({
      page: data?.current || 1,
      value: data?.name,
      advanceSearch: data?.advanceSearch,
    });
  });

  return {
    data,
    loading,
    run,
    onChangePage,
    onSearchCompany,
    refresh,
  };
};
