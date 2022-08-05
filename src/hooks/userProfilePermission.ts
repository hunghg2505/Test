import useAuth from 'hooks/redux/auth/useAuth';
import { useMemo } from 'react';
import { PERMISSION_ID, FEATURE_NAME } from 'constants/common.constants';

export default function userProfilePermission() {
  const { auth } = useAuth();

  const isHavePermissionViewProfile = useMemo(
    () =>
      auth?.user?.roles
        ?.find((item) => item.name === FEATURE_NAME.userProfile)
        ?.permissions.some((item) => item.permissionId === PERMISSION_ID.viewUserProfile),
    [auth],
  );

  return {
    isHavePermissionViewProfile,
  };
}
