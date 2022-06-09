import { useMount, useRequest } from 'ahooks';

const PAGE_SIZE = 10;

export interface IUserInfo {
  imageUrl: string;
  firstName: string;
  lastName: string;
  department: string;
  email: string;
  address: string;
}

export interface IDataSubjectDetail {
  userInfo: IUserInfo;
}

// delay function js

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getDataManagementService = async (value: any): Promise<any> => {
  await delay(1000);

  const r = new Array(15).fill(0).map((_, i) => ({
    key: `${i}`,
    noId: '0345',
    firstName: 'Dean',
    lastName: 'Nguyen',
    company: 'ABC Company',
    email: 'abc@gmail.com',
    phoneNumber: '+(84) 0123456789',
    application: 'Application 1',
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

const getDataSubjectDetail = async (id: string): Promise<IDataSubjectDetail> => {
  await delay(1000);
  return {
    userInfo: {
      imageUrl: '',
      firstName: 'Dean',
      lastName: 'Nguyen',
      department: 'ABC Company',
      email: 'abc@gmail.com',
      address: '12 Street, District 1, HCM City'
    }
  };
};

export const useDataSubjectManagement = () => {
  const { data, loading, run, mutate } = useRequest(getDataManagementService, {
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

  const onSearchDataSubject = (values = {}) => {
    if (!Object.values(values)?.filter((v) => v).length) return;
    run({ ...values });
  };

  return {
    data,
    loading,
    run,
    onChange: onChangeCurrent,
    onSearchDataSubject
  };
};

export const useDataSubjectDetail = (id: string) => {
  return useRequest(async () => getDataSubjectDetail(id));
};
