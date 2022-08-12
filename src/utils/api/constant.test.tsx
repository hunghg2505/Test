import {
  API_PATH,
  APPLICATION_SERVICE_BASE_URL,
  CASE_MANAGEMENT_BASE_URL,
  COMPANY_SERVICE_BASE_URL,
  CONSENT_MANAGEMENT_BASE_URL,
  USER_MANAGEMENT_BASE_URL,
} from './constant';

test('Test value constant', () => {
  // Account
  expect(API_PATH.LOGIN).toBe('/auth/login');
  expect(API_PATH.SIGN_UP).toBe('/auth/sign-up');
  expect(API_PATH.REFRESH_TOKEN).toBe('/auth/refresh-token');
  expect(API_PATH.AUTH_KEYSLOAK_REFRESH_TOKEN).toBe('/auth/refresh-token');
  expect(API_PATH.AUTH_KEYCLOAK_SAVE_USER).toBe('/auth/keycloak-user');

  // Data Subject Management
  expect(API_PATH.FORGET_ME('1')).toBe(`/data-subject/forget-me/1`),
    expect(API_PATH.USER_PROFILE_DETAIL('1')).toBe(`/data-subject/user-profiles/1`);
  expect(API_PATH.USER_PROFILES).toBe('/data-subject/user-profiles');
  expect(API_PATH.SUBJECT_HISTORY).toBe('/data-subject/subject-histories');
  expect(API_PATH.SEARCH_USERS).toBe('/data-subject/data-autocomplete');
  expect(API_PATH.CONSENTS).toBe('/data-subject/consents');
  expect(API_PATH.OPT_OUT_IN).toBe('/data-subject/opt-out-in');
  expect(API_PATH.GENERATE_LINK).toBe('/data-subject/generate-link');
  expect(API_PATH.GENERATE_LINK_DETAIL('ABC')).toBe(`data-subject/generate-link/ABC`);
  expect(API_PATH.CHECK_PARAMS).toBe('/data-subject/check-valid-param');
  expect(API_PATH.CONSENT_ONLY_VIEW).toBe('/data-subject/consents-public');
  expect(API_PATH.SUBJECT_HISTORY_ONLY_VIEW).toBe('/data-subject/subject-histories-public');
  expect(API_PATH.EDIT_USER_PROFILE).toBe('/data-subject/edit-profile');

  // Case Management
  expect(API_PATH.GET_LIST_CASE_MANAGEMENT).toBe(`/case-management/search`);
  expect(API_PATH.GET_LIST_CASE_MANAGEMENT_ASSIGN_TO).toBe(`${CASE_MANAGEMENT_BASE_URL}/assign-to`);
  expect(API_PATH.GET_LIST_ACTION).toBe(`${CASE_MANAGEMENT_BASE_URL}/subject-right`);
  expect(API_PATH.GET_LIST_DEPARTMENT).toBe(`${CASE_MANAGEMENT_BASE_URL}/relate-departments`);
  expect(API_PATH.GET_LIST_USER).toBe(`${CASE_MANAGEMENT_BASE_URL}/users`);
  expect(API_PATH.GET_DETAIL_CASE).toBe(`${CASE_MANAGEMENT_BASE_URL}/detail-case`);
  expect(API_PATH.GET_ACTIVITY).toBe(`${CASE_MANAGEMENT_BASE_URL}/log-activity`);
  expect(API_PATH.EDIT_CASE).toBe(`${CASE_MANAGEMENT_BASE_URL}/edit-case`);
  expect(API_PATH.SEARCH_CASE_AUTOCOMPLETE).toBe(`${CASE_MANAGEMENT_BASE_URL}/data-autocomplete`);
  expect(API_PATH.GET_CASE_CONSENT).toBe(`${CASE_MANAGEMENT_BASE_URL}/consent`);
  expect(API_PATH.DELETE_CASE).toBe(`${CASE_MANAGEMENT_BASE_URL}/delete`);
  expect(API_PATH.UPLOAD_FILE).toBe(`${CASE_MANAGEMENT_BASE_URL}/upload-file`);
  expect(API_PATH.DOWNLOAD_FILE(`text.doc`)).toBe(
    `${CASE_MANAGEMENT_BASE_URL}/commen-file/text.doc`,
  );

  // User Management
  expect(API_PATH.GET_LIST_USERS_ROLE_PERMISSION).toBe(`${USER_MANAGEMENT_BASE_URL}/users`);
  expect(API_PATH.GET_USERS_FEATURES).toBe(`${USER_MANAGEMENT_BASE_URL}/users/features`);
  expect(API_PATH.UPDATE_PERMISSIONS_TO_USER).toBe(`${USER_MANAGEMENT_BASE_URL}/users/permissions`);
  expect(API_PATH.GET_LIST_AUTOCOMPLETE_USER).toBe(`${USER_MANAGEMENT_BASE_URL}/autocomplete-user`);

  // Consent Management
  expect(API_PATH.UPDATE_CONSENT('1')).toBe(`${CONSENT_MANAGEMENT_BASE_URL}/1`);
  expect(API_PATH.GET_DETAIL_CONSENT('1')).toBe(`${CONSENT_MANAGEMENT_BASE_URL}/1`);
  expect(API_PATH.GET_LIST_APPLICATION).toBe(`${CONSENT_MANAGEMENT_BASE_URL}/list-application`);
  expect(API_PATH.GET_LIST_SERVICE).toBe(`${CONSENT_MANAGEMENT_BASE_URL}/list-service`);
  expect(API_PATH.GET_LIST_CONSENTS).toBe(`${CONSENT_MANAGEMENT_BASE_URL}/list-consents`);

  // System Configuration
  expect(API_PATH.GET_LIST_COMPANY).toBe(`${COMPANY_SERVICE_BASE_URL}/list-company`);
  expect(API_PATH.GET_LIST_APPLICATIONS).toBe(`/application/list-applications`);
  expect(API_PATH.CREATE_APPLICATION).toBe(APPLICATION_SERVICE_BASE_URL);
  expect(API_PATH.APP_ENDPOINT(1)).toBe(`/api-endpoint/1`);
  expect(API_PATH.GET_COMPANY_SUGGESTION).toBe(`${COMPANY_SERVICE_BASE_URL}/data-autocomplete`);
});
