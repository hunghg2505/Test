import { useRequest, useMount } from 'ahooks';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';

const getUserPermissions = async ({
  keyword,
  page,
}: {
  keyword?: string | undefined;
  page: number;
}): Promise<any> => {
  const response: any = await ApiUtils.fetch(API_PATH.GET_LIST_USERS_ROLE_PERMISSION, {
    keyword,
    limit: 10,
    page: page || 1,
  });

  return {
    total: response?.content?.metadata?.total || 0,
    current: +response?.content?.metadata?.currentPage || 1,
    pageSize: +response?.content?.metadata?.itemPage || 10,
    data:
      response?.content?.data?.map((item: any) => ({
        ...item,
        firstName: `${item?.givenName}`,
        lastName: `${item?.familyName}`,
        listRoles: item?.roles?.reduce((acc: any, v: any) => {
          v?.fatures?.forEach((feature: any) => {
            const listAction = feature?.permissions?.map((permission: any) => {
              return {
                ...permission,
                id: permission?.permissionId,
                actionName: permission?.permissionName,
                permission: permission?.isChecked,
              };
            });

            acc.push({
              id: `${item?.userId}_${v?.roleId}_${v?.roleName}`,
              permissionName: feature?.name,
              listAction,
            });
          });
          return acc;
        }, []),
      })) || [],
    keyword,
  };
};

const useAdminPermissions = () => {
  const { data, loading, run } = useRequest(getUserPermissions, {
    manual: true,
  });

  useMount(() => {
    run({ page: 1 });
  });

  const onChangePage = (page: number) => {
    run({ keyword: data.keyword, page });
  };

  const onSearchUserPermissions = ({ keyword }: { keyword: string }) => {
    run({ keyword, page: 1 });
  };

  return {
    data,
    loading,
    onChangePage,
    onSearchUserPermissions,
  };
};

export { useAdminPermissions };
