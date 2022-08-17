import useAuth from 'hooks/redux/auth/useAuth';
import { useMemo } from 'react';
import { PERMISSION_ID, FEATURE_NAME } from 'constants/common.constants';

export default function useSystemConfigPermission() {
  const { auth } = useAuth();

  const isHavePermissionCreateSystem = useMemo(
    () =>
      auth?.user?.roles
        ?.find((item) => item.name === FEATURE_NAME.systemConfig)
        ?.permissions.some((item) => item.permissionId === PERMISSION_ID.createSystem),
    [auth],
  );
  const isHavePermissionEditSystem = useMemo(
    () =>
      auth?.user?.roles
        ?.find((item) => item.name === FEATURE_NAME.systemConfig)
        ?.permissions.some((item) => item.permissionId === PERMISSION_ID.editSystem),
    [auth],
  );
  const isHavePermissionDeleteSystem = useMemo(
    () =>
      auth?.user?.roles
        ?.find((item) => item.name === FEATURE_NAME.systemConfig)
        ?.permissions.some((item) => item.permissionId === PERMISSION_ID.deleteSystem),
    [auth],
  );

  return {
    isHavePermissionCreateSystem,
    isHavePermissionEditSystem,
    isHavePermissionDeleteSystem,
  };
}
