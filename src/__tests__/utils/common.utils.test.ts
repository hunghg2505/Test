import moment from 'moment';
import { routePath } from 'routing/path.routing';
import {
  capitalizeFirstLetter,
  disabledFutureDate,
  formatIdSubjectHistory,
  getPermissionView,
  hasPermissionViewPage,
} from 'utils/common.utils';

test('Test FormatIdSubjectHistory', () => {
  const now = new Date();
  expect(formatIdSubjectHistory(1, 1, 'Erasure', '1', now)).toBe(
    `${new Date(now).getFullYear()}ER${'1'}`,
  );

  expect(formatIdSubjectHistory(1, 1, 'Access', '1', now)).toBe(
    `${new Date(now).getFullYear()}AC${'1'}`,
  );

  expect(formatIdSubjectHistory(1, 1, 'Object', '1', now)).toBe(
    `${new Date(now).getFullYear()}OB${'1'}`,
  );

  expect(formatIdSubjectHistory(1, 1, 'Rectification', '1', now)).toBe(
    `${new Date(now).getFullYear()}RC${'1'}`,
  );

  expect(formatIdSubjectHistory(1, 1, 'Data Portability', '1', now)).toBe(
    `${new Date(now).getFullYear()}DP${'1'}`,
  );

  expect(formatIdSubjectHistory(1, 1, 'Restriction', '1', now)).toBe(
    `${new Date(now).getFullYear()}RS${'1'}`,
  );

  expect(formatIdSubjectHistory(1, 1, 'Withdraw', '1', now)).toBe(
    `${new Date(now).getFullYear()}WD${'1'}`,
  );

  expect(
    formatIdSubjectHistory(1, 1, 'Not to be subject to automate decision making', '1', now),
  ).toBe(`${new Date(now).getFullYear()}NA${'1'}`);

  expect(formatIdSubjectHistory(1, 1, 'ZZZ', '1', now)).toBe('2');
});

test('Test CapitalizeFirstLetter', () => {
  expect(capitalizeFirstLetter('')).toBe('');
  expect(capitalizeFirstLetter('abc')).toBe('Abc');
  expect(capitalizeFirstLetter('ABC')).toBe('Abc');
  expect(capitalizeFirstLetter('aBC')).toBe('Abc');
  expect(capitalizeFirstLetter('Abc')).toBe('Abc');
});

test('Test DisabledFutureDate', () => {
  expect(disabledFutureDate(moment())).toBe(false);
});

test('Test hasPermissionViewPage', () => {
  expect(hasPermissionViewPage([{ permissions: [{ permissionId: 'A' }] }], 'A')).toEqual({
    permissions: [{ permissionId: 'A' }],
  });
  expect(hasPermissionViewPage([{ permissions: [{ permissionId: 'A' }] }], 'B')).toBe(undefined);
});

test('Test getPermissionView', () => {
  expect(getPermissionView({ path: '', exitsRoles: {} })).toEqual(true);

  expect(
    getPermissionView({
      path: routePath.Profile,
      exitsRoles: [{ permissions: [{ permissionId: 'PERMISSIONS.PDPA_UserProfile_View' }] }],
    }),
  ).toEqual(false);

  expect(
    getPermissionView({
      path: routePath.DataSubjectDetail,
      exitsRoles: [{ permissions: [{ permissionId: 'PERMISSIONS.PDPA_UserProfile_View' }] }],
    }),
  ).toEqual(false);

  expect(
    getPermissionView({
      path: routePath.DataSubjectManagement,
      exitsRoles: [{ permissions: [{ permissionId: 'PERMISSIONS.PDPA_UserProfile_View' }] }],
    }),
  ).toEqual(false);

  expect(
    getPermissionView({
      path: routePath.AssignToYou,
      exitsRoles: [{ permissions: [{ permissionId: 'PERMISSIONS.PDPA_UserProfile_View' }] }],
    }),
  ).toEqual(false);

  expect(
    getPermissionView({
      path: routePath.SearchCase,
      exitsRoles: [{ permissions: [{ permissionId: 'PERMISSIONS.PDPA_UserProfile_View' }] }],
    }),
  ).toEqual(false);

  expect(
    getPermissionView({
      path: routePath.CaseManagement,
      exitsRoles: [{ permissions: [{ permissionId: 'PERMISSIONS.PDPA_UserProfile_View' }] }],
    }),
  ).toEqual(false);

  expect(
    getPermissionView({
      path: routePath.ConsentDetail,
      exitsRoles: [{ permissions: [{ permissionId: 'PERMISSIONS.PDPA_UserProfile_View' }] }],
    }),
  ).toEqual(false);

  expect(
    getPermissionView({
      path: routePath.ConsentManagement,
      exitsRoles: [{ permissions: [{ permissionId: 'PERMISSIONS.PDPA_UserProfile_View' }] }],
    }),
  ).toEqual(false);

  expect(
    getPermissionView({
      path: routePath.UserManagement,
      exitsRoles: [{ permissions: [{ permissionId: 'PERMISSIONS.PDPA_UserProfile_View' }] }],
    }),
  ).toEqual(false);

  expect(
    getPermissionView({
      path: routePath.Reports,
      exitsRoles: [{ permissions: [{ permissionId: 'PERMISSIONS.PDPA_UserProfile_View' }] }],
    }),
  ).toEqual(false);

  expect(
    getPermissionView({
      path: routePath.SystemConfiguration,
      exitsRoles: [{ permissions: [{ permissionId: 'PERMISSIONS.PDPA_UserProfile_View' }] }],
    }),
  ).toEqual(false);
});
