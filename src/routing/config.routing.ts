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

export interface IRouter {
  icons?: JSX.Element | string | any;
  path: string;
  element: any;
  children?: IRouter[];
  name?: string;

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
    children: [
      {
        path: routePath.Profile,
        element: lazy(() => import('modules/profile')),
        name: 'Profile',
        icons: React.createElement(IconProfile)
      },
      {
        path: routePath.Reports,
        element: lazy(() => import('modules/reports')),
        name: 'Reports',
        icons: React.createElement(IconReports)
      },
      {
        path: routePath.DataSubjectManagement,
        element: lazy(() => import('modules/dataSubjectManagement/index')),
        name: 'Data Subject Management',
        icons: React.createElement(IconDataSubject)
      },
      {
        path: routePath.DataSubjectDetail,
        element: lazy(() => import('modules/dataSubjectManagement/[id]')),
        name: 'Data Subject Management',
        hiddenMenu: true
      },
      {
        path: routePath.CaseManagement,
        element: lazy(() => import('modules/caseManagement')),
        name: 'Case Management',
        icons: React.createElement(IconCaseManagement)
        // haveChild: true,

        // children: [
        //   {
        //     path: routePath.Profile,
        //     element: lazy(() => import('modules/profile')),
        //     name: 'Assigned To You'
        //   },
        //   {
        //     path: routePath.Profile,
        //     element: lazy(() => import('modules/profile')),
        //     name: 'Search Case'
        //   }
        // ]
      },
      {
        path: routePath.ConsentManagement,
        element: lazy(() => import('modules/consentManagement/index')),
        name: 'Consent Management',
        icons: React.createElement(IconConsent)
      },
      {
        path: routePath.ConsentDetail,
        element: lazy(() => import('modules/consentManagement/[id]')),
        name: 'Consent Management Detail',
        hiddenMenu: true
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
        hiddenMenu: true
      }
    ]
  },

  // Auth
  {
    path: routePath.Auth,
    element: lazy(() => import('libraries/layouts/auth.layout')),
    isAuth: false,
    children: [
      {
        path: routePath.SignIn,
        element: lazy(() => import('modules/auth/sign-in'))
      },
      {
        path: routePath.SignUp,
        element: lazy(() => import('modules/auth/sign-up'))
      },
      {
        path: routePath.ForgotPassword,
        element: lazy(() => import('modules/auth/forgot-password'))
      }
    ]
  },

  // Not Found
  {
    path: '*',
    element: lazy(() => import('modules/not-found'))
  }
];

export default configRoutes;
