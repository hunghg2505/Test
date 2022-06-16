import { useRequest } from 'ahooks';
import { debounce, get } from 'lodash';
import moment from 'moment';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';

export interface IUserInfo {
  id: string;
  imageUrl: string;
  firstName: string;
  lastName: string;
  department: string;
  email: string;
  address: string;

  firstNameEn?: string;
  lastNameEn?: string;
  firstNameTh?: string;
  lastNameTh?: string;
  dateOfBirth?: string;
  mobile?: string;
  cardId?: string;
  nationality?: string;
  passportNo?: string;
  laserCode?: string;
}

export interface IDataSubjectDetail {
  userInfo: IUserInfo;
}

const MIN_SEARCH_USER = 3;

export const getDataManagementService = async (values: any): Promise<any> => {
  const { firstname = '', username = '', advanceSearch = {}, page = 1 } = values;
  const { firstname: firstNameAdvance, ...rest } = advanceSearch;

  const params = {
    firstname: username || firstname || firstNameAdvance || '',
    advanceSearch: rest || {}
  };

  const r: any = await ApiUtils.post(API_PATH.USER_PROFILES, {
    limit: values?.limit || 10,
    page: page || 1,
    ...params
  });

  const current = r?.content?.metadata?.currentPage || 1;
  return {
    current,
    total: r?.content?.metadata?.total || 0,
    data: r?.content?.data
      ?.sort((a: any, b: any) => a.firstNameEn.localeCompare(b.firstNameEn))
      .map((item: any, idx: number) => ({
        key: `${item?.id}`,
        noId: `${(current - 1) * 10 + idx + 1 || idx}`,
        firstName: item?.firstNameEn || '',
        lastName: item?.lastNameEn || '',
        company: 'ABC Company default',
        email: item?.email || '',
        phoneNumber: item?.mobile || '',
        application: 'Application 1 default',
        action: `${item?.id}`
      })),
    params
  };
};

const getDataSubjectDetail = async (id: string): Promise<IDataSubjectDetail> => {
  const r: any = await ApiUtils.fetch(API_PATH.USER_PROFILE_DETAIL(id));

  return {
    userInfo: {
      imageUrl: '',
      id: `${r?.content?.id}`,
      firstName: r?.content?.firstNameEn || '',
      lastName: r?.content?.lastNameEn || '',
      department: 'ABC Company',
      email: r?.content?.email || '',
      address: 'Default address'
    }
  };
};

const getUsers = async (value: any) => {
  const params = {
    firstname: value || '',
    limit: 10,
    page: 1
  };

  const res: any = await ApiUtils.fetch(API_PATH.SEARCH_USERS, params);
  return res?.content?.data?.map((v: any, idx: number) => ({ id: idx, name: v.firstNameEn }));
};

export const useDataSubjectManagement = () => {
  const { data, loading, run } = useRequest(getDataManagementService, {
    manual: true
  });

  const requestSearchUsers = useRequest(
    async (value: string) => {
      return getUsers(value);
    },
    {
      manual: true
    }
  );

  const onSearchUsersDebounce = debounce(async (values: any[], callback: Function) => {
    const value = get(values, '[0].value', '');
    if (value?.length < MIN_SEARCH_USER) return;

    await requestSearchUsers.runAsync(value);
    if (callback) callback();
  }, 350);

  const onChangeCurrent = (page: number) => {
    run({
      page,
      ...data.params
    });
  };

  const onSearchDataSubject = (values = {}, callback: Function) => {
    if (!Object.values(values)?.filter((v) => v).length) return;

    run({ ...values });
    if (callback) callback();
  };

  return {
    data,
    loading,
    run,
    onChange: onChangeCurrent,
    onSearchDataSubject,
    requestSearchUsers,
    onSearchUsersDebounce
  };
};

export const useDataSubjectDetail = (id: string) => {
  return useRequest(async () => getDataSubjectDetail(id));
};
