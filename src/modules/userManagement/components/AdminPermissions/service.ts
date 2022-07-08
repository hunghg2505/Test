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
  const response: any = await ApiUtils.fetch(API_PATH.GET_PERMISSION_ROLE_IN_USERS, {
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
        listRoles: [
          {
            id: 12,
            permissionName: 'User Profile',
            listAction: [
              { id: Math.random() * Math.random(), actionName: 'View', permission: true },
            ],
          },
          {
            id: 22,
            permissionName: 'Data Subject Management',
            listAction: [
              { id: Math.random() * Math.random(), actionName: 'View', permission: true },
              { id: Math.random() * Math.random(), actionName: 'Edit', permission: false },
            ],
          },
          {
            id: 23,
            permissionName: 'Case Management',
            listAction: [
              {
                id: Math.random() * Math.random(),
                actionName: 'View Assigned To',
                permission: true,
              },
              { id: Math.random() * Math.random(), actionName: 'View Search', permission: true },
              { id: Math.random() * Math.random(), actionName: 'Create', permission: false },
              { id: Math.random() * Math.random(), actionName: 'Edit', permission: true },
              { id: Math.random() * Math.random(), actionName: 'Delete', permission: false },
            ],
          },
          {
            id: 44,
            permissionName: 'Consent Management',
            listAction: [
              { id: Math.random() * Math.random(), actionName: 'Create', permission: false },
              { id: Math.random() * Math.random(), actionName: 'Edit', permission: true },
              { id: Math.random() * Math.random(), actionName: 'Delete', permission: false },
            ],
          },
          {
            id: 35,
            permissionName: 'User Management',
            listAction: [
              { id: Math.random() * Math.random(), actionName: 'View', permission: true },
              { id: Math.random() * Math.random(), actionName: 'Edit', permission: true },
            ],
          },
        ],
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
