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
  { label: 'Please Select', value: null },
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
  caseManagement: 'Case Management',
  consentManagement: 'Consent Management',
  dataSubjectManagement: 'Data Subject Management',
};

export const PERMISSION_ID = {
  createCase: 'PDPA_CaseManagement_Create',
  editConsent: 'PDPA_ConsentManagement_Edit',
  createConsent: 'PDPA_ConsentManagement_Create',
  editDataSubject: 'PDPA_DataSubjectManagement_Edit',
  deleteCase: 'PDPA_CaseManagement_Delete',
  editCase: 'PDPA_CaseManagement_Edit',
};

export const STATUS_CONSENT_DROPDOWN_DATA = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
];
