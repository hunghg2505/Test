export const BACKEND_URL = process.env.REACT_APP_API_DOMAIN;

const CASE_MANAGEMENT_BASE_URL = '/case-management';
const USER_MANAGEMENT_BASE_URL = '/user-management';

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

  // Case Management
  CASE_MANAGEMENT_BASE_URL,
  GET_LIST_CASE_MANAGEMENT: `${CASE_MANAGEMENT_BASE_URL}/search`,
  GET_LIST_ACTION: `${CASE_MANAGEMENT_BASE_URL}/subject-right`,
  GET_LIST_DEPARTMENT: `${CASE_MANAGEMENT_BASE_URL}/relate-departments`,
  GET_LIST_USER: `${CASE_MANAGEMENT_BASE_URL}/users`,

  // User Management
  GET_PERMISSION_ROLE_IN_USERS: `${USER_MANAGEMENT_BASE_URL}/permission-role-in-users`,
};
