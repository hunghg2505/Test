import { getMenu, getMenuChild, getMenuItem } from 'utils/get-menu.utils';

test('Test getMenuItem', () => {
  expect(
    getMenuItem({
      item: {
        roles: ['@'],
        path: '/',
        name: 'Name',
      },
      hiddenMenu: true,
      auth: {
        user: {
          roles: 'Admin',
        },
      },
    }),
  ).toEqual({ children: [], icon: undefined, key: '/', label: 'Name' });

  expect(
    getMenuItem({
      item: {
        roles: ['@'],
        path: '/',
        hiddenMenu: true,
        name: 'Name',
      },
      haveIcon: false,
      auth: {
        user: {
          roles: 'Admin',
        },
      },
    }),
  ).toBe(null);
});

test('Test getMenuChild', () => {
  expect(
    getMenuChild({
      item: {
        roles: ['@'],
        path: '/',
        name: 'Name',
      },
      hiddenMenu: true,
      auth: {
        user: {
          roles: 'Admin',
        },
      },
    }),
  ).toEqual([]);

  expect(
    getMenuChild({
      item: {
        roles: ['@'],
        path: '/',
        name: 'Name',
        haveChild: true,
        children: [
          {
            roles: ['@'],
            path: '/',
            name: 'Name',
          },
        ],
      },
      hiddenMenu: true,
      auth: {
        user: {
          roles: 'Admin',
        },
      },
    }),
  ).toEqual([
    {
      key: '/',
      label: 'Name',
    },
  ]);
});

test('Test getMenu', () => {
  expect(
    getMenu(
      [
        {
          path: '/',
          element: null,
          icons: 'Icon',
          name: 'Name',
          isAuth: true,
          hiddenMenu: true,
          roles: ['@'],
        },
      ],
      {
        user: {
          roles: 'Admin',
        },
      },
    ),
  ).toEqual([]);

  expect(
    getMenu(
      [
        {
          path: '/',
          element: null,
          icons: 'Icon',
          name: 'Name',
          isAuth: true,
          hiddenMenu: true,
          roles: ['@'],
          children: [
            {
              path: '/profile',
              element: null,
              name: 'Profile',
              icons: 'Icon',
              roles: ['Admin'],
            },
          ],
        },
      ],
      {
        user: {
          roles: ['Admin'],
        },
      },
    ),
  ).toEqual([]);
});
