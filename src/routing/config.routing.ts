// Layout
import { lazy } from 'react';
import { routePath } from './path.routing';
import { HomeOutlined } from '@ant-design/icons';
import React from 'react';
import IconProfile from 'assets/icons/icon-profile';
import IconReports from 'assets/icons/icon-reports';
import IconDataSubject from 'assets/icons/icon-data-subject';
import IconCaseManagement from 'assets/icons/icon-case-management';
import IconConsent from 'assets/icons/icon-consent';
import IconUserManagement from 'assets/icons/icon-user-management';

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
        path: routePath.Profile,
        element: lazy(() => import('modules/profile')),
        name: 'Profile',
        icons: React.createElement(IconProfile),
        roles: ['Super Admin', 'DPO', 'Authorized User'],
      },
      {
        path: routePath.Reports,
        element: lazy(() => import('modules/reports')),
        name: 'Reports',
        icons: React.createElement(IconReports),
        roles: ['@'],
      },
      {
        path: routePath.DataSubjectManagement,
        element: lazy(() => import('modules/dataSubjectManagement/index')),
        name: 'Data Subject Management',
        icons: React.createElement(IconDataSubject),
        roles: ['Super Admin', 'DPO', 'Authorized User'],
      },
      {
        path: routePath.DataSubjectDetail,
        element: lazy(() => import('modules/dataSubjectManagement/[id]')),
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
        roles: ['Super Admin', 'DPO', 'Authorized User'],
        children: [
          {
            path: routePath.AssignToYou,
            element: lazy(() => import('modules/caseManagement/assignToYou/index')),
            name: 'Assigned To You',
            roles: ['Super Admin', 'DPO', 'Authorized User'],
          },
          {
            path: routePath.SearchCase,
            element: lazy(() => import('modules/caseManagement/SearchCase/index')),
            name: 'Search Case',
            roles: ['Super Admin', 'DPO'],
          },
        ],
      },
      {
        path: routePath.AssignToYou,
        element: lazy(() => import('modules/caseManagement/assignToYou/index')),
        name: 'Assigned To You',
        hiddenMenu: true,
        roles: ['Super Admin', 'DPO', 'Authorized User'],
      },
      {
        path: routePath.CaseManagementDetail,
        element: lazy(() => import('modules/caseManagement/[id]')),
        name: 'Assigned To You',
        hiddenMenu: true,
        roles: ['Super Admin', 'DPO', 'Authorized User'],
      },
      {
        path: routePath.SearchCase,
        element: lazy(() => import('modules/caseManagement/SearchCase/index')),
        name: 'Search Case',
        hiddenMenu: true,
        roles: ['Super Admin', 'DPO'],
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
        element: lazy(() => import('modules/consentManagement/[id]')),
        name: 'Consent Management Detail',
        hiddenMenu: true,
        roles: ['Super Admin', 'Administrator', 'DPO', 'Authorized User'],
      },
      {
        path: routePath.UserManagement,
        element: lazy(() => import('modules/userManagement/index')),
        name: 'User Management',
        icons: React.createElement(IconUserManagement),
        roles: ['@'],
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
      {
        path: routePath.SignUp,
        element: lazy(() => import('modules/auth/sign-up')),
        roles: ['@'],
      },
      {
        path: routePath.ForgotPassword,
        element: lazy(() => import('modules/auth/forgot-password')),
        roles: ['@'],
      },
    ],
  },

  // Not Found
  {
    path: '*',
    element: lazy(() => import('modules/not-found')),
    roles: ['@'],
  },
];

export default configRoutes;
