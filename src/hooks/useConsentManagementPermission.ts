import useAuth from 'hooks/redux/auth/useAuth';
import { useMemo } from 'react';
import { PERMISSION_ID, FEATURE_NAME } from 'constants/common.constants';

export default function useConsentManagementPermission() {
  const { auth } = useAuth();

  const isHavePermissionViewConsent = useMemo(
    () =>
      auth?.user?.roles
        ?.find((item) => item.name === FEATURE_NAME.consentManagement)
        ?.permissions.some((item) => item.permissionId === PERMISSION_ID.viewConsent),
    [auth],
  );

  const isHavePermissionCreateConsent = useMemo(
    () =>
      auth?.user?.roles
        ?.find((item) => item.name === FEATURE_NAME.consentManagement)
        ?.permissions.some((item) => item.permissionId === PERMISSION_ID.createConsent),
    [auth],
  );

  const isHavePermissionEditConsent = useMemo(
    () =>
      auth?.user?.roles
        ?.find((item) => item.name === FEATURE_NAME.consentManagement)
        ?.permissions.some((item) => item.permissionId === PERMISSION_ID.editConsent),
    [auth],
  );

  return {
    isHavePermissionEditConsent,
    isHavePermissionCreateConsent,
    isHavePermissionViewConsent,
  };
}
