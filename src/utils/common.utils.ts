import moment from 'moment';
import { routePath } from 'routing/path.routing';
import { PERMISSIONS } from 'types/common.types';

export const formatIdSubjectHistory = (
  current: number,
  index: number,
  requestType: string,
  id: string,
  createdDate: Date,
) => {
  let formattedId;
  if (requestType.includes('Erasure')) {
    formattedId = `${new Date(createdDate).getFullYear()}ER${id}`;
    return formattedId;
  }
  if (requestType.includes('Access')) {
    formattedId = `${new Date(createdDate).getFullYear()}AC${id}`;
    return formattedId;
  }
  if (requestType.includes('Object')) {
    formattedId = `${new Date(createdDate).getFullYear()}OB${id}`;
    return formattedId;
  }
  if (requestType.includes('Rectification')) {
    formattedId = `${new Date(createdDate).getFullYear()}RC${id}`;
    return formattedId;
  }
  if (requestType.includes('Data Portability')) {
    formattedId = `${new Date(createdDate).getFullYear()}DP${id}`;
    return formattedId;
  }
  if (requestType.includes('Restriction')) {
    formattedId = `${new Date(createdDate).getFullYear()}RS${id}`;
    return formattedId;
  }
  if (requestType.includes('Withdraw')) {
    formattedId = `${new Date(createdDate).getFullYear()}WD${id}`;
    return formattedId;
  }
  if (requestType.includes('Not to be subject to automate decision making')) {
    formattedId = `${new Date(createdDate).getFullYear()}NA${id}`;
    return formattedId;
  }

  return `${(current - 1) * 10 + index + 1 || index}`;
};

export function capitalizeFirstLetter(string: string) {
  if (!string) return string;
  const stringLowercase = string.toLowerCase();
  return stringLowercase?.charAt(0).toUpperCase() + stringLowercase?.slice(1);
}

export const disabledFutureDate = (current: any) => {
  const customDate = moment().format('YYYY-MM-DD');
  return current && current > moment(customDate, 'YYYY-MM-DD').add(1, 'day');
};

export const hasPermissionViewPage = (exitsRoles: any, permissionConst: string) => {
  return exitsRoles?.find((item: any) => {
    const isHasPermission = item?.permissions?.find(
      (v: any) => v?.permissionId === permissionConst,
    );
    if (isHasPermission) return true;
    return false;
  });
};

export const getPermissionView = ({ path, exitsRoles }: any) => {
  if (path === routePath.Profile) {
    const hasPermissionsUserViews = hasPermissionViewPage(
      exitsRoles,
      PERMISSIONS.PDPA_UserProfile_View,
    );

    if (!hasPermissionsUserViews) return false;
  }

  if (path === routePath.DataSubjectDetail || path === routePath.DataSubjectManagement) {
    const hasPermissionsUserViews = hasPermissionViewPage(
      exitsRoles,
      PERMISSIONS.PDPA_DataSubjectManagement_View,
    );

    if (!hasPermissionsUserViews) return false;
  }

  if (path === routePath.AssignToYou) {
    const hasPermissionsUserViews = hasPermissionViewPage(
      exitsRoles,
      PERMISSIONS.PDPA_CaseManagement_ViewAssignedTo,
    );

    if (!hasPermissionsUserViews) return false;
  }

  if (path === routePath.SearchCase) {
    const hasPermissionsUserViews = hasPermissionViewPage(
      exitsRoles,
      PERMISSIONS.PDPA_CaseManagement_ViewSearchCase,
    );

    if (!hasPermissionsUserViews) return false;
  }

  if (path === routePath.CaseManagement) {
    const hasPermissionsUserViewSearchCase = hasPermissionViewPage(
      exitsRoles,
      PERMISSIONS.PDPA_CaseManagement_ViewSearchCase,
    );
    const hasPermissionsUserViewAssignTo = hasPermissionViewPage(
      exitsRoles,
      PERMISSIONS.PDPA_CaseManagement_ViewAssignedTo,
    );

    if (hasPermissionsUserViewAssignTo && hasPermissionsUserViewSearchCase) return true;
    if (hasPermissionsUserViewAssignTo && !hasPermissionsUserViewSearchCase) return true;
    if (!hasPermissionsUserViewAssignTo && hasPermissionsUserViewSearchCase) return true;
    if (!hasPermissionsUserViewAssignTo && !hasPermissionsUserViewSearchCase) return false;
  }

  if (path === routePath.ConsentDetail || path === routePath.ConsentManagement) {
    const hasPermissionsUserViews = hasPermissionViewPage(
      exitsRoles,
      PERMISSIONS.PDPA_ConsentManagement_View,
    );

    if (!hasPermissionsUserViews) return false;
  }

  if (path === routePath.UserManagement) {
    const hasPermissionsUserViews = hasPermissionViewPage(
      exitsRoles,
      PERMISSIONS.PDPA_UserManagement_View,
    );

    if (!hasPermissionsUserViews) return false;
  }

  if (path === routePath.Reports) {
    const hasPermissionsUserViews = hasPermissionViewPage(
      exitsRoles,
      PERMISSIONS.PDPA_Reports_View,
    );

    if (!hasPermissionsUserViews) return false;
  }

  if (path.includes(routePath.SystemConfiguration)) {
    const hasPermissionsUserViewSystemConfig = hasPermissionViewPage(
      exitsRoles,
      PERMISSIONS.PDPA_SystemConfig_View,
    );
    if (!hasPermissionsUserViewSystemConfig) return false;
  }

  return true;
};
