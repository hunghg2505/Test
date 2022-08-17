// Date Format
export const DateFormat = {
  HH_mm: 'HH:mm',
  DD_MM_YYYY: 'DD-MM-YYYY',
};

export const DATA_SUBJECT_RIGHT_DROPDOWN_DATA = [
  {
    label: 'Erasure(Forget Me)',
    value: 'Erasure(Forget Me)',
  },
  {
    label: 'Access(Opt-in)',
    value: 'Access(Opt-in)',
  },
  {
    label: 'Object(Opt-out)',
    value: 'Object(Opt-out)',
  },
  {
    label: 'Rectification',
    value: 'Rectification',
  },
  {
    label: 'Data Portability',
    value: 'Data Portability',
  },
  {
    label: 'Restriction',
    value: 'Restriction',
  },
  {
    label: 'Withdraw',
    value: 'Withdraw',
  },
  {
    label: 'Not to be subject to automate decision making',
    value: 'Not to be subject to automate decision making',
  },
];

export const STATUS_DROPDOWN_DATA = [
  { label: 'New', value: 'New' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Canceled', value: 'Cancelled' },
  { label: 'Rejected', value: 'Rejected' },
  { label: 'Closed', value: 'Closed' },
];

export const RESULT_DROPDOWN_DATA = [
  { label: 'Completed', value: 'Completed' },
  { label: 'Reject', value: 'Reject' },
];

export const FEATURE_NAME = {
  userProfile: 'User Profile',
  caseManagement: 'Case Management',
  consentManagement: 'Consent Management',
  dataSubjectManagement: 'Data Subject Management',
  systemConfig: 'System Configuration',
};

export const PERMISSION_ID = {
  createCase: 'PDPA_CaseManagement_Create',
  viewConsent: 'PDPA_ConsentManagement_View',
  editConsent: 'PDPA_ConsentManagement_Edit',
  createConsent: 'PDPA_ConsentManagement_Create',
  editDataSubject: 'PDPA_DataSubjectManagement_Edit',
  deleteCase: 'PDPA_CaseManagement_Delete',
  editCase: 'PDPA_CaseManagement_Edit',
  editProfile: 'PDPA_UserProfile_Edit',
  createLink: 'PDPA_DataSubjectManagement_Create',
  viewSearchCase: 'PDPA_CaseManagement_ViewSearchCase',
  viewAssignToCase: 'PDPA_CaseManagement_ViewAssignedTo',
  viewUserProfile: 'PDPA_UserProfile_View',
  viewDSM: 'PDPA_DataSubjectManagement_View',
  viewSystem: 'PDPA_SystemConfig_View',
  deleteSystem: 'PDPA_SystemConfig_Delete',
  editSystem: 'PDPA_SystemConfig_Edit',
  createSystem: 'PDPA_SystemConfig_Create',
};

export const STATUS_CONSENT_DROPDOWN_DATA = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
];

export const METHOD_DROPDOWN_DATA = [
  { label: 'GET', value: 'get' },
  { label: 'PUT', value: 'put' },
  { label: 'POST', value: 'post' },
  { label: 'PATCH', value: 'patch' },
  { label: 'DELETE', value: 'delete' },
];

export const GENERAL_CONFIG_TYPE = {
  SUBJECT_RIGHT: 'SUBJECT_RIGHT',
  RELATED_DEPARTMENT: 'RELATED_DEPARTMENT',
  CASE_STATUS: 'CASE_STATUS',
  CASE_RESULT: 'CASE_RESULT',
};

export const GENERAL_CASE_MANAGEMENT_LIST = [
  'SUBJECT_RIGHT',
  'RELATED_DEPARTMENT',
  'CASE_STATUS',
  'CASE_RESULT',
];
