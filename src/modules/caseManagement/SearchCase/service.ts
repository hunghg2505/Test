import { useRequest } from 'ahooks';

const PAGE_SIZE = 10;

const getSearchCase = async () => {
  const r = new Array(15).fill(0).map((_, i) => ({
    key: `${i}`,
    caseId: `${i}`,
    refId: '1234',
    dsName: 'Dean Ng',
    description: 'Short Description',
    assignTo: 'Phattararak',
    caseStatus: 'In-Progress',
    createdDate: '24/05/2022',
    action: i,
  }));

  const formatData = {
    list: r,
    current: 1,
  };

  return {
    ...formatData,
    total: Math.ceil(formatData.list.length / PAGE_SIZE),
    data: formatData?.list?.slice(
      (formatData.current - 1) * PAGE_SIZE,
      (formatData.current - 1) * PAGE_SIZE + PAGE_SIZE,
    ),
  };
};

const useSearchCase = () => {
  const { data, loading } = useRequest(getSearchCase);
  const onChange = () => {
    console.log('a');
  };
  return {
    data,
    loading,
    onChange,
  };
};

export { useSearchCase };
