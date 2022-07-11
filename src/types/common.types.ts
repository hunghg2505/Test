type TPermissionId =
  | 'PDPA_UserProfile_View'
  | 'PDPA_DataSubjectManagement_View'
  | 'PDPA_DataSubjectManagement_Edit'
  | 'PDPA_CaseManagement_ViewAssignedTo'
  | 'PDPA_CaseManagement_Edit'
  | 'PDPA_CaseManagement_Create'
  | 'PDPA_CaseManagement_Delete'
  | 'PDPA_ConsentManagement_View'
  | 'PDPA_ConsentManagement_Edit'
  | 'PDPA_ConsentManagement_Create'
  | 'PDPA_UserManagement_View'
  | 'PDPA_UserManagement_Edit';

export const PERMISSIONS = {
  PDPA_UserProfile_View: 'PDPA_UserProfile_View',
  PDPA_DataSubjectManagement_View: 'PDPA_DataSubjectManagement_View',
  PDPA_DataSubjectManagement_Edit: 'PDPA_DataSubjectManagement_Edit',
  PDPA_CaseManagement_ViewAssignedTo: 'PDPA_CaseManagement_ViewAssignedTo',
  PDPA_CaseManagement_ViewSearchCase: 'PDPA_CaseManagement_ViewSearchCase',
  PDPA_CaseManagement_Edit: 'PDPA_CaseManagement_Edit',
  PDPA_CaseManagement_Create: 'PDPA_CaseManagement_Create',
  PDPA_CaseManagement_Delete: 'PDPA_CaseManagement_Delete',
  PDPA_ConsentManagement_View: 'PDPA_ConsentManagement_View',
  PDPA_ConsentManagement_Edit: 'PDPA_ConsentManagement_Edit',
  PDPA_ConsentManagement_Create: 'PDPA_ConsentManagement_Create',
  PDPA_UserManagement_View: 'PDPA_UserManagement_View',
  PDPA_UserManagement_Edit: 'PDPA_UserManagement_Edit',
};

export type TRoles = {
  id: string;
  name: string;
  permissions: {
    featureId: number;
    id: number;
    permissionId: TPermissionId;
    permissionName: string;
  }[];
}[];

export interface User {
  email: string;
  roles?: TRoles;
  loading: boolean;
}
