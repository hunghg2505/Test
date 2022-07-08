import { useRequest, useMount } from 'ahooks';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';

const getUserPermissions = async (values: any): Promise<any> => {
  const response: any = await ApiUtils.fetch(API_PATH.GET_PERMISSION_ROLE_IN_USERS, {
    keyword: values?.keyword,
    limit: 10,
    page: values?.current || 1,
  });

  return {
    total: response?.content?.metadata?.total || 0,
    current: +response?.content?.metadata?.currentPage || 1,
    pageSize: +response?.content?.metadata?.itemPage || 10,
    data:
      response?.content?.data?.map((item: any, idx: number) => ({
        ...item,
        firstName: `${item?.givenName}`,
        lastName: `${item?.familyName}`,
      })) || [],
    keyword: values?.keyword,
  };
};

const useAdminPermissions = () => {
  const { data, loading, run } = useRequest(getUserPermissions, {
    manual: true,
    cacheKey: 'user-permissions',
  });

  const onChangePage = (page: number) => {
    run({
      page,
    });
  };

  useMount(() => {
    run(getUserPermissions);
  });

  return {
    data,
    loading,
    onChange: onChangePage,
  };
};

export { useAdminPermissions };
