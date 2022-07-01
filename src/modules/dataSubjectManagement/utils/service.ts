import { useRequest } from 'ahooks';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import { useRef, useState } from 'react';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';

export interface IUserInfo {
  id?: string;
  imageUrl?: string;
  email?: string;
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
  const {
    firstname = '',
    username = '',
    advanceSearch = {},
    page = 1,
    isEqualSearch = false,
  } = values;
  const { firstname: firstNameAdvance, ...rest } = advanceSearch;

  const params = {
    firstname: username || firstname || firstNameAdvance || '',
    isEqualSearch,
    advanceSearch: { ...rest },
  };

  const r: any = await ApiUtils.post(API_PATH.USER_PROFILES, {
    limit: values?.limit || 10,
    page: page || 1,
    ...params,
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
        action: `${item?.id}`,
      })),
    params,
  };
};

const getDataSubjectDetail = async (id: string): Promise<IDataSubjectDetail> => {
  const r: any = await ApiUtils.fetch(API_PATH.USER_PROFILE_DETAIL(id));

  return {
    userInfo: {
      id: r?.content?.id,
      imageUrl: '',
      firstNameEn: r?.content?.firstNameEn || '',
      lastNameEn: r?.content?.lastNameEn || '',
      firstNameTh: r?.content?.firstNameTh || '',
      lastNameTh: r?.content?.lastNameTh || '',
      email: r?.content?.email || '',
      address: 'Test Address',
      dateOfBirth: r?.content?.dateOfBirth || '',
      nationality: r?.content?.nationality || '',
      cardId: r?.content?.cardId || '',
      passportNo: r?.content?.passportNo || '',
      laserCode: r?.content?.laserCode || '',
      mobile: r?.content?.mobile || '',
    },
  };
};

const getUsers = async (value: any, page = 1, column: string) => {
  const params = {
    column,
    searchString: value || '',
    limit: 10,
    page,
  };

  const res: any = await ApiUtils.fetch(API_PATH.SEARCH_USERS, params);

  return {
    data: res?.content?.data?.map((v: any, idx: number) => ({ id: idx, name: v.firstNameEn })),
    isLoadMore: +res?.content?.metadata?.currentPage < +res?.content?.metadata?.lastPage,
    currentPage: +res?.content?.metadata?.currentPage,
    value,
  };
};

export const useDataSubjectManagement = () => {
  const refCancelRequest = useRef(false);

  const [users, setUsers] = useState<{
    data: any[];
    isLoadMore: boolean;
    currentPage: number;
    value: string;
  }>({
    data: [],
    isLoadMore: false,
    currentPage: 1,
    value: '',
  });

  const { data, loading, run } = useRequest(getDataManagementService, {
    manual: true,
    cacheKey: 'data-management',
  });

  const requestSearchUsers = useRequest(
    async (value: string, column, page = 1, isLoadMore = false) => {
      if (refCancelRequest.current) throw Error('Block request');
      return getUsers(value, page, column);
    },
    {
      manual: true,
      refreshDeps: [refCancelRequest.current],
      onError: (err: any) => {
        refCancelRequest.current = false;
      },
      onSuccess: (r: any, params) => {
        const isLoadMore = params[3];

        setUsers((prev) => {
          const newData = isLoadMore ? [...prev.data, ...r.data] : r.data;

          return {
            data: newData,
            isLoadMore: r.isLoadMore,
            currentPage: r.currentPage,
            value: r.value,
          };
        });
      },
    },
  );

  const onResetUsers = () => {
    setUsers({
      data: [],
      isLoadMore: false,
      currentPage: 1,
      value: '',
    });
  };

  const onLoadMoreUsers = (column: string) => {
    requestSearchUsers.run(users.value, column, users.currentPage + 1, true);
  };

  const onSearchUsersDebounce = debounce(
    async (values: any[], callback: () => void, column: string) => {
      const value = get(values, '[0].value', '');
      if (value?.length < MIN_SEARCH_USER) return;

      await requestSearchUsers.runAsync(value, column, 1, false);
      if (callback) callback();
    },
    350,
  );

  const onChangeCurrent = (page: number) => {
    run({
      page,
      ...data.params,
    });
  };

  const onSearchDataSubject = (values = {}, callback: () => void) => {
    if (!Object.values(values)?.filter((v) => v).length) return;
    if (get(values, 'type') === 'enter') refCancelRequest.current = true;

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
    onSearchUsersDebounce,
    users,
    onResetUsers,
    onLoadMoreUsers,
  };
};

export const useDataSubjectDetail = (id: string) => {
  return useRequest(async () => getDataSubjectDetail(id));
};
