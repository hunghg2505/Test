import { useMount, useRequest } from 'ahooks';

const PAGE_SIZE = 10;

// delay function js
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getConsentManagementService = async (value: any): Promise<any> => {
  await delay(1000);
  const r = new Array(15).fill(0).map((_, i) => ({
    key: `${i}`,
    consentId: '0345',
    appId: '12340',
    appName: 'Ascend Finance',
    consentVersion: 'V1.23',
    description: 'Description',
    createdAt: '03/05/2022',
    updatedAt: '03/05/2022',
    action: i
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

export const useConsentManagement = () => {
  const { data, loading, run, mutate } = useRequest(getConsentManagementService, {
    manual: true
  });

  useMount(() => {
    run('');
  });

  const onChangeCurrent = (current: number) => {
    if (mutate) {
      mutate({
        ...data,
        current,
        data: data?.list?.slice((current - 1) * PAGE_SIZE, (current - 1) * PAGE_SIZE + PAGE_SIZE)
      });
    }
  };

  const onNext = (next: number) => {
    if (data.current >= data.total) return;
    onChangeCurrent(next);
  };

  const onPrev = (prev: number) => {
    if (data.current <= 1) return;
    onChangeCurrent(prev);
  };

  return {
    data,
    loading,
    run,
    onNext,
    onPrev
  };
};
