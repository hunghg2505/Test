import { useRequest, useMount } from 'ahooks';
import { message } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import useAuth from 'hooks/redux/auth/useAuth';
import ApiUtils from 'utils/api/api.utils';
import { API_PATH } from 'utils/api/constant';

const TEXT_PERMISSIONS: any = {
  PDPA_CaseManagement_Edit: 'Edit',
  PDPA_CaseManagement_Delete: 'Delete',
  PDPA_CaseManagement_Create: 'Create',
  PDPA_CaseManagement_ViewAssignedTo: 'View Assigned To',
  PDPA_CaseManagement_ViewSearchCase: 'View Search Case',
  PDPA_ConsentManagement_Edit: 'Edit',
  PDPA_ConsentManagement_View: 'View',
  PDPA_ConsentManagement_Create: 'Create',
  PDPA_DataSubjectManagement_Edit: 'Edit',
  PDPA_DataSubjectManagement_View: 'View',
  PDPA_UserManagement_Edit: 'Edit',
  PDPA_UserManagement_View: 'View',
  PDPA_UserProfile_View: 'View',
};

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

  const current = +response?.content?.metadata?.currentPage || 1;

  return {
    total: response?.content?.metadata?.total || 0,
    current: current,
    pageSize: +response?.content?.metadata?.itemPage || 10,
    data:
      response?.content?.data?.map((item: any, idx: number) => ({
        ...item,
        key: `${item?.userId}`,
        no: `${(current - 1) * 10 + idx + 1 || idx}`,
        firstName: `${item?.givenName}`,
        lastName: `${item?.familyName}`,
        listRoles: item?.roles?.reduce((acc: any, v: any) => {
          v?.fatures?.forEach((feature: any) => {
            const listAction = feature?.permissions?.map((permission: any) => {
              return {
                ...permission,
                id: permission?.permissionId,
                actionName: TEXT_PERMISSIONS[permission?.permissionId],
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

const serviceUpdatePermissions = (permissionId: string, value: boolean, record: any) => {
  const roleSelected = record?.roles?.find((role: any) => {
    const isExist = role?.fatures?.find((v: any) => {
      const isFeatureExist = v?.permissions?.find((f: any) => f?.permissionId === permissionId);
      if (isFeatureExist) return v;
    });
    if (isExist) return role;
  });

  return ApiUtils.put(API_PATH.UPDATE_PERMISSIONS_TO_USER, {
    permissionId: permissionId,
    roleId: roleSelected?.roleId,
    userId: record?.userId,
    isAddPermission: value,
  });
};

const useUpdatePermissions = () => {
  const { getProfile } = useAuth();

  return useRequest(
    async ({
      permissionId,
      value,
      record,
    }: {
      permissionId: string;
      value: boolean;
      evt: CheckboxChangeEvent;
      record: any;
    }) => serviceUpdatePermissions(permissionId, value, record),
    {
      manual: true,
      onSuccess: (r) => {
        localStorage.setItem('get_profile', 'true');
        message.success('Update permission is succeeded');
        getProfile();
      },
      onError: (e, params) => {
        const value = params[0]?.value;
        const evt = params[0]?.evt;
        message.error('Update permission is failed');
        evt.target.checked = !value;
        (evt.nativeEvent.target as any)?.parentElement?.classList?.toggle('ant-checkbox-checked');
      },
    },
  );
};

export { useUpdatePermissions, useAdminPermissions };
