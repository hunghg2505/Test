import { useMount, useRequest } from 'ahooks';
import dayjs from 'dayjs';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';

const PAGE_SIZE = 10;

const getListCaseManagementService = async (values: any): Promise<any> => {
  const response: any = await ApiUtils.post(API_PATH.GET_LIST_CASE_MANAGEMENT, {
    userId: 1,
    limit: 10,
    page: values?.current || 1,
    searchString: values.searchString || 'test',
  });

  const current = response?.content?.metadata?.currentPage || 1;

  return {
    total: response?.content?.metadata?.total || 0,
    current: +response?.content?.metadata?.currentPage || 1,
    pageSize: +response?.content?.metadata?.itemPage || 10,
    data:
      response?.content?.data?.map((item: any, idx: number) => ({
        ...item,
        key: `${item?.id}`,
        noId: `${(current - 1) * 10 + idx + 1 || idx}`,
        description: item?.description,
        assignTo: item?.assignTo,
        caseStatus: item?.responseStatus,
        createdDate: dayjs(item?.dateOfResponse).format('MMM DD, YYYY'),
      })) || [],
    searchString: values.searchString || '',
  };
};

// const getSearchCase = async () => {
//   const r = new Array(15).fill(0).map((_, i) => ({
//     key: `${i}`,
//     caseId: `${i}`,
//     refId: '1234',
//     dsName: 'Dean Ng',
//     description: 'Short Description',
//     assignTo: 'Phattararak',
//     caseStatus: 'In-Progress',
//     createdDate: '24/05/2022',
//     action: i,
//   }));

//   const formatData = {
//     list: r,
//     current: 1,
//   };

//   return {
//     ...formatData,
//     total: Math.ceil(formatData.list.length / PAGE_SIZE),
//     data: formatData?.list?.slice(
//       (formatData.current - 1) * PAGE_SIZE,
//       (formatData.current - 1) * PAGE_SIZE + PAGE_SIZE,
//     ),
//   };
// };

const useSearchCase = () => {
  const { data, loading, run } = useRequest(getListCaseManagementService, {
    cacheKey: 'case-management',
  });

  const onChangePage = (page: number) => {
    run({
      page,
      searchString: data.searchString,
    });
  };

  const onSearchCase = (values = {}) => {
    run({ ...values });
  };

  useMount(() => {
    run(getListCaseManagementService);
  });

  return {
    data,
    loading,
    onChangePage,
    onSearchCase,
  };
};

export { useSearchCase };
