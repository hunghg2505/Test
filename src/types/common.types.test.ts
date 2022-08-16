import { PERMISSIONS } from './common.types';

test('Test routing', () => {
  expect(PERMISSIONS.PDPA_UserProfile_View).toBe('PDPA_UserProfile_View');
  expect(PERMISSIONS.PDPA_DataSubjectManagement_View).toBe('PDPA_DataSubjectManagement_View');
  expect(PERMISSIONS.PDPA_DataSubjectManagement_Edit).toBe('PDPA_DataSubjectManagement_Edit');
  expect(PERMISSIONS.PDPA_CaseManagement_ViewAssignedTo).toBe('PDPA_CaseManagement_ViewAssignedTo');
  expect(PERMISSIONS.PDPA_CaseManagement_ViewSearchCase).toBe('PDPA_CaseManagement_ViewSearchCase');
  expect(PERMISSIONS.PDPA_CaseManagement_Edit).toBe('PDPA_CaseManagement_Edit');
  expect(PERMISSIONS.PDPA_CaseManagement_Create).toBe('PDPA_CaseManagement_Create');
  expect(PERMISSIONS.PDPA_CaseManagement_Delete).toBe('PDPA_CaseManagement_Delete');
  expect(PERMISSIONS.PDPA_ConsentManagement_View).toBe('PDPA_ConsentManagement_View');
  expect(PERMISSIONS.PDPA_ConsentManagement_Edit).toBe('PDPA_ConsentManagement_Edit');
  expect(PERMISSIONS.PDPA_ConsentManagement_Create).toBe('PDPA_ConsentManagement_Create');
  expect(PERMISSIONS.PDPA_UserManagement_View).toBe('PDPA_UserManagement_View');
  expect(PERMISSIONS.PDPA_UserManagement_Edit).toBe('PDPA_UserManagement_Edit');
  expect(PERMISSIONS.PDPA_Reports_View).toBe('PDPA_Reports_View');
});
