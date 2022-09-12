// Layout
import { HomeOutlined } from '@ant-design/icons';
import IconCaseManagement from 'assets/icons/icon-case-management';
import IconConsent from 'assets/icons/icon-consent';
import IconDataSubject from 'assets/icons/icon-data-subject';
import IconUserManagement from 'assets/icons/icon-user-management';
import React, { lazy } from 'react';
import { routePath } from './path.routing';

export interface IRouter {
  icons?: JSX.Element | string | any;
  path: string;
  element: any;
  children?: IRouter[];
  name?: string;
  roles?: string[];

  // status
  haveChild?: boolean;
  isAuth?: boolean;
  hiddenMenu?: boolean;
}

const configRoutes: IRouter[] = [
  // Main Page
  {
    path: routePath.HomePage,
    element: lazy(() => import('libraries/layouts/main.layout')),
    icons: React.createElement(HomeOutlined),
    name: 'Home',
    hiddenMenu: true,
    isAuth: true,
    roles: ['@'],
    children: [
      {
        path: routePath.DataSubjectManagement,
        element: lazy(() => import('modules/dataSubjectManagement/index')),
        name: 'Data Subject Management',
        icons: React.createElement(IconDataSubject),
        roles: ['Super Admin', 'DPO', 'Authorized User'],
      },
      {
        path: routePath.DataSubjectDetail,
        element: lazy(() => import('modules/dataSubjectManagement/DataSubjectDetail')),
        name: 'Data Subject Management',
        hiddenMenu: true,
        roles: ['Super Admin', 'DPO', 'Authorized User'],
      },
      {
        path: routePath.CaseManagement,
        element: lazy(() => import('modules/caseManagement/index')),
        name: 'Case Management',
        icons: React.createElement(IconCaseManagement),
        haveChild: true,
        roles: ['Super Admin', 'DPO', 'Authorized User', 'Administrator'],
        children: [
          {
            path: routePath.AssignToYou,
            element: lazy(() => import('modules/caseManagement/assignToYou/index')),
            name: 'Assigned To You',
            roles: ['Super Admin', 'DPO', 'Authorized User', 'Administrator'],
          },
          {
            path: routePath.SearchCase,
            element: lazy(() => import('modules/caseManagement/SearchCase/index')),
            name: 'Search Case',
            roles: ['Super Admin', 'DPO', 'Authorized User', 'Administrator'],
          },
        ],
      },
      {
        path: routePath.AssignToYou,
        element: lazy(() => import('modules/caseManagement/assignToYou/index')),
        name: 'Assigned To You',
        hiddenMenu: true,
        roles: ['Super Admin', 'DPO', 'Authorized User', 'Administrator'],
      },
      {
        path: routePath.CaseManagementDetail,
        element: lazy(() => import('modules/caseManagement/CaseManagementDetail')),
        name: 'Assigned To You',
        hiddenMenu: true,
        roles: ['Super Admin', 'DPO', 'Authorized User', 'Administrator'],
      },
      {
        path: routePath.SearchCase,
        element: lazy(() => import('modules/caseManagement/SearchCase/index')),
        name: 'Search Case',
        hiddenMenu: true,
        roles: ['Super Admin', 'DPO', 'Authorized User', 'Administrator'],
      },
      {
        path: routePath.ConsentManagement,
        element: lazy(() => import('modules/consentManagement/index')),
        name: 'Consent Management',
        icons: React.createElement(IconConsent),
        roles: ['Super Admin', 'Administrator', 'DPO', 'Authorized User'],
      },
      {
        path: routePath.ConsentDetail,
        element: lazy(() => import('modules/consentManagement/ConsentNewPage')),
        name: 'Consent Management Detail',
        hiddenMenu: true,
        roles: ['Super Admin', 'Administrator', 'DPO', 'Authorized User'],
      },
      {
        path: routePath.UserManagement,
        element: lazy(() => import('modules/userManagement/index')),
        name: 'User Management',
        icons: React.createElement(IconUserManagement),
        roles: ['Super Admin', 'Administrator'],
      },
      {
        path: routePath.SystemConfiguration,
        element: lazy(() => import('modules/SystemConfiguration/index')),
        name: 'System Configuration',
        icons: React.createElement(IconCaseManagement),
        haveChild: true,
        roles: ['Super Admin', 'DPO', 'Authorized User', 'Administrator'],
        children: [
          {
            path: routePath.ConnectionConfiguration,
            element: lazy(
              () => import('modules/SystemConfiguration/ConnectionConfiguration/index'),
            ),
            name: 'Connection Configuration',
            roles: ['Super Admin', 'DPO', 'Authorized User', 'Administrator'],
          },
          {
            path: routePath.GeneralConfiguration,
            element: lazy(() => import('modules/SystemConfiguration/GeneralConfiguration/index')),
            name: 'General Configuration',
            roles: ['Super Admin', 'DPO', 'Authorized User', 'Administrator'],
          },
        ],
      },
      {
        path: routePath.ConnectionConfiguration,
        element: lazy(() => import('modules/SystemConfiguration/ConnectionConfiguration/index')),
        name: 'Connection Configuration',
        hiddenMenu: true,
        roles: ['Super Admin', 'DPO', 'Authorized User', 'Administrator'],
      },
      {
        path: routePath.ConnectionConfigurationDetail,
        element: lazy(
          () =>
            import('modules/SystemConfiguration/ConnectionConfiguration/ConnectionConfigDetail'),
        ),
        name: 'Connection Configuration Detail',
        hiddenMenu: true,
        roles: ['Super Admin', 'DPO', 'Authorized User', 'Administrator'],
      },
      {
        path: routePath.GeneralConfiguration,
        element: lazy(() => import('modules/SystemConfiguration/GeneralConfiguration/index')),
        name: 'General Configuration',
        hiddenMenu: true,
        roles: ['Super Admin', 'DPO', 'Authorized User', 'Administrator'],
      },
      // {
      //   path: routePath.ConsentManagement,
      //   element: lazy(() => import('modules/consentManagement/index')),
      //   name: 'Consent Management'
      // },
      // {
      //   path: routePath.ConsentDetail,
      //   element: lazy(() => import('modules/consentManagement/[id]')),
      //   name: 'Consent Management',
      //   hiddenMenu: true
      // },
      // test
      {
        path: routePath.ProfileHash,
        element: lazy(() => import('modules/profile/ProfileDetailPage')),
        isAuth: true,
        roles: ['@'],
      },

      // Not Found
      {
        path: '*',
        element: lazy(() => import('modules/not-found')),
        hiddenMenu: true,
        roles: ['@'],
      },
    ],
  },

  // Auth
  {
    path: routePath.Auth,
    element: lazy(() => import('libraries/layouts/auth.layout')),
    isAuth: false,
    roles: ['@'],
    children: [
      {
        path: routePath.SignIn,
        element: lazy(() => import('modules/auth/sign-in')),
        roles: ['@'],
      },
    ],
  },

  // Profile hash

  // Not Found
  {
    path: '*',
    element: lazy(() => import('modules/not-found')),
    roles: ['@'],
  },
];

export default configRoutes;
