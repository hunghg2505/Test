export const BACKEND_URL = process.env.REACT_APP_API_DOMAIN;

export const CASE_MANAGEMENT_BASE_URL = '/case-management';
export const USER_MANAGEMENT_BASE_URL = '/user-management';
export const CONSENT_MANAGEMENT_BASE_URL = '/consent-management';

export const API_PATH = {
  // Account
  LOGIN: '/auth/login',
  SIGN_UP: '/auth/sign-up',
  REFRESH_TOKEN: '/auth/refresh-token',
  AUTH_KEYSLOAK_REFRESH_TOKEN: '/auth/refresh-token',
  AUTH_KEYCLOAK_SAVE_USER: '/auth/keycloak-user',

  // Data Subject Management
  FORGET_ME: (id: string | number) => `/data-subject/forget-me/${id}`,
  USER_PROFILE_DETAIL: (id: string | number) => `/data-subject/user-profiles/${id}`,
  USER_PROFILES: '/data-subject/user-profiles',
  SUBJECT_HISTORY: '/data-subject/subject-histories',
  SEARCH_USERS: '/data-subject/data-autocomplete',
  CONSENTS: '/data-subject/consents',
  OPT_OUT_IN: '/data-subject/opt-out-in',
  GENERATE_LINK: '/data-subject/generate-link',
  GENERATE_LINK_DETAIL: (token: string) => `data-subject/generate-link/${token}`,
  CHECK_PARAMS: '/data-subject/check-valid-param',
  CONSENT_ONLY_VIEW: '/data-subject/consents-public',
  SUBJECT_HISTORY_ONLY_VIEW: '/data-subject/subject-histories-public',
  EDIT_USER_PROFILE: '/data-subject/edit-profile',

  // Case Management
  CASE_MANAGEMENT_BASE_URL,
  GET_LIST_CASE_MANAGEMENT: `${CASE_MANAGEMENT_BASE_URL}/search`,
  GET_LIST_CASE_MANAGEMENT_ASSIGN_TO: `${CASE_MANAGEMENT_BASE_URL}/assign-to`,
  GET_LIST_ACTION: `${CASE_MANAGEMENT_BASE_URL}/subject-right`,
  GET_LIST_DEPARTMENT: `${CASE_MANAGEMENT_BASE_URL}/relate-departments`,
  GET_LIST_USER: `${CASE_MANAGEMENT_BASE_URL}/users`,
  GET_DETAIL_CASE: `${CASE_MANAGEMENT_BASE_URL}/detail-case`,
  GET_ACTIVITY: `${CASE_MANAGEMENT_BASE_URL}/log-activity`,
  EDIT_CASE: `${CASE_MANAGEMENT_BASE_URL}/edit-case`,
  SEARCH_CASE_AUTOCOMPLETE: `${CASE_MANAGEMENT_BASE_URL}/data-autocomplete`,
  GET_CASE_CONSENT: `${CASE_MANAGEMENT_BASE_URL}/consent`,
  DELETE_CASE: `${CASE_MANAGEMENT_BASE_URL}/delete`,
  UPLOAD_FILE: `${CASE_MANAGEMENT_BASE_URL}/upload-file`,
  DOWNLOAD_FILE: (fileName: string) => `${CASE_MANAGEMENT_BASE_URL}/commen-file/${fileName}`,

  // User Management
  GET_LIST_USERS_ROLE_PERMISSION: `${USER_MANAGEMENT_BASE_URL}/users`,
  GET_USERS_FEATURES: `${USER_MANAGEMENT_BASE_URL}/users/features`,
  UPDATE_PERMISSIONS_TO_USER: `${USER_MANAGEMENT_BASE_URL}/users/permissions`,
  GET_LIST_AUTOCOMPLETE_USER: `${USER_MANAGEMENT_BASE_URL}/autocomplete-user`,

  // Consent Management
  CONSENT_MANAGEMENT_BASE_URL,
  UPDATE_CONSENT: (id: string | number) => `${CONSENT_MANAGEMENT_BASE_URL}/${id}`,
  GET_DETAIL_CONSENT: (id: string | number) => `${CONSENT_MANAGEMENT_BASE_URL}/${id}`,
  GET_LIST_APPLICATION: `${CONSENT_MANAGEMENT_BASE_URL}/list-application`,
  GET_LIST_SERVICE: `${CONSENT_MANAGEMENT_BASE_URL}/list-service`,
  GET_LIST_CONSENTS: `${CONSENT_MANAGEMENT_BASE_URL}/list-consents`,
};
