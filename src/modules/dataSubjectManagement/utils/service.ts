import { API_PATH } from 'utils/api/constant';
import ApiUtils from 'utils/api/api.utils';
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

export const getDataManagementService = async (values: any): Promise<any> => {
  const r: any = await ApiUtils.post(API_PATH.USER_PROFILES, {
    firstname: values?.username,
    limit: values?.limit || 10,
    page: values?.page || 1,
    ...values
  });

  console.log('data', r);

  // const r = new Array(15).fill(0).map((_, i) => ({
  //   key: `${i}`,
  //   noId: '0345',
  //   firstName: 'Dean',
  //   lastName: 'Nguyen',
  //   company: 'ABC Company',
  //   email: 'abc@gmail.com',
  //   phoneNumber: '+(84) 0123456789',
  //   application: 'Application 1',
  //   action: i
  // }));

  const formatData = {
    list: r?.content?.data?.map((item: any) => ({
      key: `${item?.id}`,
      noId: item?.laserCode || '',
      firstName: item?.firstNameEn || '',
      lastName: item?.lastNameEn || '',
      company: 'ABC Company default',
      email: item?.email || '',
      phoneNumber: item?.mobile || '',
      application: 'Application 1 default',
      action: `${item?.id}`
    })),
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
  const r: any = await ApiUtils.fetch(API_PATH.USER_PROFILE_DETAIL(id));

  return {
    userInfo: {
      imageUrl: '',
      firstName: r?.content?.firstNameEn || '',
      lastName: r?.content?.lastNameEn || '',
      department: 'ABC Company',
      email: r?.content?.email || '',
      address: 'Default address'
    }
  };
};

export const useDataSubjectManagement = () => {
  const { data, loading, run, mutate } = useRequest(getDataManagementService, {
    manual: true
  });

  useMount(() => {
    // run('');
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
    console.log('search', values);

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
