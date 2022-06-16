import { useRequest } from 'ahooks';

const PAGE_SIZE = 6;

// delay function js
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getContentService = async (value: any): Promise<any> => {
  await delay(100);

  const r = new Array(10).fill(0).map((_, i) => ({
    key: `${i}`,
    dataConsent: {
      name: 'Consent ABC',
      lastUpdated: 'Date',
      version: 'V1.0',
      status: i % 2 === 0 ? 'Accepted' : 'Not Accepted',
      description: 'Description',
      list: [
        {
          title: 'Title 1',
          description: 'Description 1',
          value: 'Value1'
        },
        {
          title: 'Title 2',
          description: 'Description 2',
          value: 'Value2'
        }
      ]
    }
  }));
  const formatData = {
    list: r,
    current: 1
  };

  return {
    ...formatData,
    total: Math.ceil(formatData.list.length / PAGE_SIZE),
    data: formatData?.list?.slice(
      (formatData.current - 1) * PAGE_SIZE,
      (formatData.current - 1) * PAGE_SIZE + PAGE_SIZE
    )
  };
};

export const useConsent = () => {
  const { data, loading, mutate } = useRequest(getContentService);

  const onChange = (current: number) => {
    if (mutate) {
      mutate({
        ...data,
        current,
        data: data?.list?.slice((current - 1) * PAGE_SIZE, (current - 1) * PAGE_SIZE + PAGE_SIZE)
      });
    }
  };

  return {
    data,
    loading,
    onChange
  };
};
