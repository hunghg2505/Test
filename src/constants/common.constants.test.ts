import {
  DateFormat,
  FEATURE_NAME,
  PERMISSION_ID,
  DATA_SUBJECT_RIGHT_DROPDOWN_DATA,
} from './common.constants';

test('Test DateFormat', () => {
  expect(DateFormat.DD_MM_YYYY).toBe('DD-MM-YYYY');
  expect(DateFormat.HH_mm).toBe('HH:mm');
});

test('Test DATA_SUBJECT_RIGHT_DROPDOWN_DATA', () => {
  expect(DATA_SUBJECT_RIGHT_DROPDOWN_DATA).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ value: 'Erasure(Forget Me)' }),
      expect.objectContaining({ value: 'Access(Opt-in)' }),
      expect.objectContaining({ value: 'Object(Opt-out)' }),
      expect.objectContaining({ value: 'Rectification' }),
      expect.objectContaining({ value: 'Data Portability' }),
      expect.objectContaining({ value: 'Restriction' }),
      expect.objectContaining({ value: 'Withdraw' }),
      expect.objectContaining({ value: 'Not to be subject to automate decision making' }),
    ]),
  );
});

test('Test FEATURE_NAME', () => {
  expect(FEATURE_NAME.userProfile).toBe('User Profile');
  expect(FEATURE_NAME.caseManagement).toBe('Case Management');
  expect(FEATURE_NAME.consentManagement).toBe('Consent Management');
  expect(FEATURE_NAME.dataSubjectManagement).toBe('Data Subject Management');
});

test('Test PERMISSION_ID', () => {
  expect(PERMISSION_ID.createCase).toBe('PDPA_CaseManagement_Create');
  expect(PERMISSION_ID.editConsent).toBe('PDPA_ConsentManagement_Edit');
  expect(PERMISSION_ID.createConsent).toBe('PDPA_ConsentManagement_Create');
  expect(PERMISSION_ID.editDataSubject).toBe('PDPA_DataSubjectManagement_Edit');
  expect(PERMISSION_ID.deleteCase).toBe('PDPA_CaseManagement_Delete');
  expect(PERMISSION_ID.editCase).toBe('PDPA_CaseManagement_Edit');
  expect(PERMISSION_ID.editProfile).toBe('PDPA_UserProfile_Edit');
  expect(PERMISSION_ID.createLink).toBe('PDPA_DataSubjectManagement_Create');
  expect(PERMISSION_ID.viewSearchCase).toBe('PDPA_CaseManagement_ViewSearchCase');
  expect(PERMISSION_ID.viewAssignToCase).toBe('PDPA_CaseManagement_ViewAssignedTo');
});
