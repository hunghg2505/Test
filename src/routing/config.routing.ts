// Layout
import { lazy } from 'react';
import { routePath } from './path.routing';
import { HomeOutlined, QuestionCircleOutlined, ContactsOutlined } from '@ant-design/icons';
import React from 'react';

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
        name: 'Profile'
      },
      {
        path: routePath.Reports,
        element: lazy(() => import('modules/reports')),
        name: 'Reports'
      },
      {
        path: routePath.DataSubjectManagement,
        element: lazy(() => import('modules/dataSubjectManagement/index')),
        name: 'Data Subject Management'
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
        haveChild: true
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
        element: lazy(() => import('modules/consentManagement')),
        name: 'Consent Management'
      },

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
