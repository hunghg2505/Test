import { Drawer, Grid, Layout, Menu } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import IconInfo from 'assets/icons/icon-info';
import IconLogout from 'assets/icons/icon-logout';
import Logo from 'assets/icons/logo';
import useAuth from 'hooks/redux/auth/useAuth';
import cloneDeep from 'lodash/cloneDeep';
import withAuthClient from 'middlewares/withAuthClient';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import configRoutes, { IRouter } from 'routing/config.routing';
import { getPermissionView } from 'routing/master-routes.routing';
import MainHeader from './header/main.header';
import SEO from './SEO';
import styles from './styles.module.scss';

const { useBreakpoint } = Grid;
const collapsedWidth = '50px';

function MainLayout() {
  const navigate = useNavigate();
  const { auth, onLogout } = useAuth();
  const location = useLocation();
  const screens = useBreakpoint();
  const { t } = useTranslation();

  const [menus, setMenus] = useState<ItemType[]>([]);

  // menu status
  const [defaultSelected, setDefaultSelected] = useState<string[]>([]);

  // sider
  const [showSider, setShowSider] = useState(true);

  useEffect(() => {
    if (screens.md) {
      setShowSider(true);
      return;
    }
    setShowSider(false);
  }, [screens]);

  useEffect(() => {
    getMenu(configRoutes);
  }, []);

  useEffect(() => {
    let path = location?.pathname;

    if (path) {
      const newDefaultSelected = [];
      path = path?.includes('consent') ? '/consent' : path;
      path = path?.includes('data-subject') ? '/data-subject' : path;
      newDefaultSelected.push(path);
      setDefaultSelected(newDefaultSelected);
    }
  }, [location.pathname, menus]);

  // get list menu form router config
  const getMenu = (routes: IRouter[]) => {
    const newRouterConfig = cloneDeep(routes);
    const routerNotAuth = newRouterConfig.find((x) => x.isAuth === true);
    const menus: any[] = [];
    if (routerNotAuth) {
      const listChild = routerNotAuth.children || [];
      listChild.forEach((item) => {
        let isPermissionView = true;
        if (!item.roles?.includes('@')) {
          isPermissionView = getPermissionView({ path: item?.path, exitsRoles: auth?.user?.roles });
        }

        if (!isPermissionView) item.hiddenMenu = true;

        if (item.hiddenMenu) return null;

        const menu: ItemType = {
          key: item.path,
          icon: item.icons,
          label: item.name,
          children: [],
        };

        const childMenu: any[] = [];
        if (item.haveChild) {
          const childItem = item.children || [];
          childItem.forEach((item) => {
            let isPermissionView = true;
            if (!item.roles?.includes('@')) {
              isPermissionView = getPermissionView({
                path: item?.path,
                exitsRoles: auth?.user?.roles,
              });
            }

            if (!isPermissionView) item.hiddenMenu = true;

            if (item.hiddenMenu) return null;
            if (!item.hiddenMenu) {
              childMenu.push({
                key: item.path,
                label: item.name,
              });
            }
          });
        }
        menus.push({ ...menu, children: childMenu.length > 0 ? childMenu : undefined });
      });
    }
    setMenus(menus);
  };

  const onClickMenu = (event: any) => {
    navigate(event.key);
  };

  // click toggle sider
  const toggleSider = (status?: boolean) => {
    setShowSider(status !== undefined ? status : !showSider);
  };

  const MenuFooter = () => {
    return (
      <Menu
        className={styles.menu2}
        onClick={(e) => {
          if (e.key === '/logout') return onLogout();
          navigate(e.key);
        }}
        items={[
          {
            label: <>{t('logout')}</>,
            icon: <IconLogout />,
            key: '/logout',
          },
          {
            label: <>{t('help')}</>,
            icon: <IconInfo />,
            key: '/help',
          },
        ]}
      />
    );
  };

  return (
    <Layout className='min-height'>
      <SEO />

      {/** Main Content */}
      <Layout className={styles.container}>
        {/** screen is desktop */}
        {screens.md ? (
          <Sider
            width={285}
            className={styles.siderView}
            collapsedWidth={screens.md ? collapsedWidth : 0}
            collapsed={!showSider !== undefined ? !showSider : false}
            onCollapse={() => {
              toggleSider && toggleSider();
            }}
          >
            <div className={styles.logo}>
              <Logo />
            </div>
            <Menu
              onClick={onClickMenu}
              mode='inline'
              selectedKeys={defaultSelected}
              style={{ borderRight: 0 }}
              inlineCollapsed={!showSider}
              items={menus}
            />
            <MenuFooter />
          </Sider>
        ) : (
          <Drawer
            className='sider-bar-drawer'
            placement='left'
            closable={false}
            bodyStyle={{ padding: 0 }}
            visible={showSider}
            onClose={() => {
              toggleSider && toggleSider();
            }}
          >
            <Menu
              onClick={onClickMenu}
              mode='inline'
              selectedKeys={defaultSelected}
              style={{ borderRight: 0 }}
              items={menus}
            />
            <MenuFooter />
          </Drawer>
        )}

        {/** Main layout content */}
        <Layout className={styles.mainLayout}>
          <Content
            className='site-layout-background'
            style={{
              overflow: 'overlay',
            }}
          >
            {/** Header */}
            <MainHeader
              toggleSider={toggleSider}
              showSider={showSider}
              user={auth?.user}
              isMobile={!!screens.md}
            />
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      {/** Footer */}
      {/* <MainFooter /> */}
    </Layout>
  );
}

export default withAuthClient(MainLayout);
