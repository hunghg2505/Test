import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { cloneDeep } from 'lodash';
import { IRouter } from 'routing/config.routing';
import { getPermissionView } from './common.utils';

export const getMenuItem = ({ item, haveIcon = true, auth }: any) => {
  let isPermissionView = true;
  if (!item.roles?.includes('@')) {
    isPermissionView = getPermissionView({ path: item?.path, exitsRoles: auth?.user?.roles });
  }

  if (!isPermissionView) item.hiddenMenu = true;

  if (item.hiddenMenu) return null;
  if (!haveIcon) {
    return {
      key: item.path,
      label: item.name,
    };
  }
  return {
    key: item.path,
    icon: item.icons,
    label: item.name,
    children: [],
  };
};

export const getMenuChild = ({ item, auth }: any) => {
  const childMenu: any = [];
  if (!item.haveChild) return childMenu;

  const childItem = item.children || [];
  childItem.forEach((it: any) => {
    const menu = getMenuItem({ item: it, haveIcon: false, auth });

    childMenu.push(menu);
  });

  return childMenu;
};

export const getMenu = (routes: IRouter[], auth: any) => {
  const newRouterConfig = cloneDeep(routes);
  const routerNotAuth = newRouterConfig.find((x) => x.isAuth === true);
  const menuItem: any[] = [];

  if (!routerNotAuth) return [];

  const listChild = routerNotAuth.children || [];
  listChild.forEach((item) => {
    const menu: ItemType = getMenuItem({ item, auth });
    const childMenu: any[] = getMenuChild({ item, auth });

    if (menu) {
      menuItem.push({ ...menu, children: childMenu.length > 0 ? childMenu : undefined });
    }
  });

  return menuItem;
};
