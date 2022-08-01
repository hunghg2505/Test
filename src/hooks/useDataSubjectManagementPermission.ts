import useAuth from 'hooks/redux/auth/useAuth';
import { useMemo } from 'react';
import { PERMISSION_ID, FEATURE_NAME } from 'constants/common.constants';

export default function useDataSubjectManagementPermission() {
  const { auth } = useAuth();

  const isHavePermissionSaveConsent = useMemo(
    () =>
      auth?.user?.roles
        ?.find((item) => item.name === FEATURE_NAME.dataSubjectManagement)
        ?.permissions.some((item) => item.permissionId === PERMISSION_ID.editDataSubject),
    [auth],
  );

  const isHavePermissionCreateLink = useMemo(
    () =>
      auth?.user?.roles
        ?.find((item) => item.name === FEATURE_NAME.dataSubjectManagement)
        ?.permissions.some((item) => item.permissionId === PERMISSION_ID.createLink),
    [auth],
  );

  const isHavePermissionEditProfile = useMemo(
    () =>
      auth?.user?.roles
        ?.find((item) => item.name === FEATURE_NAME.userProfile)
        ?.permissions.some((item) => item.permissionId === PERMISSION_ID.editProfile),
    [auth],
  );

  return {
    isHavePermissionSaveConsent,
    isHavePermissionCreateLink,
    isHavePermissionEditProfile,
  };
}
