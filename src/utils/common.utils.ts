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
  if (requestType.includes('Not to be subject to automated decision making')) {
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

const checkPermissions = (exitsRoles: any, permissionId: any) => {
  const hasPermissionsUserViews = hasPermissionViewPage(exitsRoles, permissionId);

  if (!hasPermissionsUserViews) return false;
  return true;
};

export const getPermissionView = ({ path, exitsRoles }: any) => {
  let isPermissions = true;

  switch (path) {
    case routePath.Profile:
      isPermissions = checkPermissions(exitsRoles, PERMISSIONS.PDPA_UserProfile_View);
      break;
    case routePath.DataSubjectDetail:
      isPermissions = checkPermissions(exitsRoles, PERMISSIONS.PDPA_DataSubjectManagement_View);
      break;
    case routePath.DataSubjectManagement:
      isPermissions = checkPermissions(exitsRoles, PERMISSIONS.PDPA_DataSubjectManagement_View);
      break;
    case routePath.AssignToYou:
      isPermissions = checkPermissions(exitsRoles, PERMISSIONS.PDPA_CaseManagement_ViewAssignedTo);
      break;
    case routePath.SearchCase:
      isPermissions = checkPermissions(exitsRoles, PERMISSIONS.PDPA_CaseManagement_ViewSearchCase);
      break;
    case routePath.ConsentDetail:
      isPermissions = checkPermissions(exitsRoles, PERMISSIONS.PDPA_ConsentManagement_View);
      break;
    case routePath.ConsentManagement:
      isPermissions = checkPermissions(exitsRoles, PERMISSIONS.PDPA_ConsentManagement_View);
      break;
    case routePath.UserManagement:
      isPermissions = checkPermissions(exitsRoles, PERMISSIONS.PDPA_UserManagement_View);
      break;
    case routePath.Reports:
      isPermissions = checkPermissions(exitsRoles, PERMISSIONS.PDPA_Reports_View);
      break;
    case routePath.SystemConfiguration:
      isPermissions = checkPermissions(exitsRoles, PERMISSIONS.PDPA_SystemConfig_View);
      break;
    case routePath.CaseManagement:
      {
        const hasPermissionsUserViewSearchCase = hasPermissionViewPage(
          exitsRoles,
          PERMISSIONS.PDPA_CaseManagement_ViewSearchCase,
        );
        const hasPermissionsUserViewAssignTo = hasPermissionViewPage(
          exitsRoles,
          PERMISSIONS.PDPA_CaseManagement_ViewAssignedTo,
        );

        if (!hasPermissionsUserViewAssignTo && !hasPermissionsUserViewSearchCase)
          isPermissions = false;
      }
      break;
  }

  return isPermissions;
};

export const getColorStroke = (type: string) => {
  let color;

  switch (type) {
    case 'get':
      color = '#2f80ed';
      break;
    case 'patch':
      color = '#e2b93b';
      break;
    case 'put':
      color = '#e2b93b';
      break;
    case 'delete':
      color = '#cf2a2b';
      break;
    case 'post':
      color = '#27ae60';
      break;
    default:
      color = '';
      break;
  }

  return color;
};
