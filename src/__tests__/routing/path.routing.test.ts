import { routePath } from 'routing/path.routing';

test('Test routing', () => {
  expect(routePath.HomePage).toBe('/');
  expect(routePath.Profile).toBe('/profile');
  expect(routePath.ProfileHash).toBe('/:hash');
  expect(routePath.Reports).toBe('/reports');
  expect(routePath.DataSubjectManagement).toBe('/data-subject');
  expect(routePath.DataSubjectDetail).toBe('/data-subject/:businessProfileId/:idNo');
  expect(routePath.CaseManagement).toBe('/case-management');
  expect(routePath.CaseManagementDetail).toBe('/case-management/:id');
  expect(routePath.AssignToYou).toBe('/case-management/assign-to-you');
  expect(routePath.SearchCase).toBe('/case-management/search-case');
  expect(routePath.ConsentManagement).toBe('/consent');
  expect(routePath.ConsentDetail).toBe('/consent/:id');
  expect(routePath.UserManagement).toBe('/user-management');
  expect(routePath.Auth).toBe('/auth');
  expect(routePath.SignIn).toBe('/auth/sign-in');
  expect(routePath.SystemConfiguration).toBe('/system-configuration');
  expect(routePath.GeneralConfiguration).toBe('/system-configuration/general-configuration');
  expect(routePath.ConnectionConfiguration).toBe('/system-configuration/connection-configuration');
});
