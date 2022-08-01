import useAuth from 'hooks/redux/auth/useAuth';
import { useMemo } from 'react';
import { PERMISSION_ID, FEATURE_NAME } from 'constants/common.constants';

export default function useCaseManagementPermission() {
  const { auth } = useAuth();

  const isHavePermissionCreateCase = useMemo(
    () =>
      auth?.user?.roles
        ?.find((item) => item.name === FEATURE_NAME.caseManagement)
        ?.permissions.some((item) => item.permissionId === PERMISSION_ID.createCase),
    [auth],
  );

  const isHavePermissionEditCase = useMemo(
    () =>
      auth?.user?.roles
        ?.find((item) => item.name === FEATURE_NAME.caseManagement)
        ?.permissions.some((item) => item.permissionId === PERMISSION_ID.editCase),
    [auth],
  );

  const isHavePermissionDeleteCase = useMemo(
    () =>
      auth?.user?.roles
        ?.find((item) => item.name === FEATURE_NAME.caseManagement)
        ?.permissions.some((item) => item.permissionId === PERMISSION_ID.deleteCase),
    [auth],
  );

  const isHavePermissionViewSearchCase = useMemo(
    () =>
      auth?.user?.roles
        ?.find((item) => item.name === FEATURE_NAME.caseManagement)
        ?.permissions.some((item) => item.permissionId === PERMISSION_ID.viewSearchCase),
    [auth],
  );

  const isHavePermissionViewAssignToCase = useMemo(
    () =>
      auth?.user?.roles
        ?.find((item) => item.name === FEATURE_NAME.caseManagement)
        ?.permissions.some((item) => item.permissionId === PERMISSION_ID.viewAssignToCase),
    [auth],
  );

  return {
    isHavePermissionCreateCase,
    isHavePermissionEditCase,
    isHavePermissionDeleteCase,
    isHavePermissionViewSearchCase,
    isHavePermissionViewAssignToCase,
  };
}
