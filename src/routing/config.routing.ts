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
        path: routePath.About,
        element: lazy(() => import('modules/about')),
        icons: React.createElement(QuestionCircleOutlined),
        name: 'About',
        haveChild: true,
        children: [
          {
            path: routePath.About,
            element: lazy(() => import('modules/about')),
            name: 'About'
          }
        ]
      },
      {
        path: routePath.AboutDetail,
        element: lazy(() => import('modules/about/about-detail')),
        name: 'About detail',
        hiddenMenu: true
      },
      {
        path: routePath.Contact,
        element: lazy(() => import('modules/contact')),
        icons: React.createElement(ContactsOutlined),
        name: 'Contact'
      },
      {
        path: routePath.Consent,
        element: lazy(() => import('modules/consent')),
        icons: React.createElement(ContactsOutlined),
        name: 'Consent Management'
      },
      {
        path: routePath.ConsentDetail,
        element: lazy(() => import('modules/consent/[id]')),
        name: 'Consent Management',
        hiddenMenu: true
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
