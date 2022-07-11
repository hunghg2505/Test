import useAuth from 'hooks/redux/auth/useAuth';
import { useMemo } from 'react';
import { PERMISSION_ID, FEATURE_NAME } from 'constants/common.constants';

export default function useDataSubjectManagementPermission() {
  const { auth } = useAuth();

  const isHavePermissionCreateCase = useMemo(
    () =>
      auth?.user?.roles
        ?.find((item) => item.name === FEATURE_NAME.caseManagement)
        ?.permissions.some((item) => item.permissionId === PERMISSION_ID.createCase),
    [auth],
  );

  return {
    isHavePermissionCreateCase,
  };
}