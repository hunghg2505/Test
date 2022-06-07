import { Drawer, Grid, Layout, Menu } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import Logo from 'assets/icons/logo';
import IconLogout from 'assets/icons/icon-logout';
import useAuth from 'hooks/redux/auth/useAuth';
import useDocument from 'hooks/redux/document/useDocument';
import cloneDeep from 'lodash/cloneDeep';
import withAuthClient from 'middlewares/withAuthClient';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import configRoutes, { IRouter } from 'routing/config.routing';
import MainHeader from './header/main.header';
import styles from './styles.module.scss';
import IconInfo from 'assets/icons/icon-info';

const { useBreakpoint } = Grid;
const collapsedWidth = '50px';

const REGEX_DYNAMIC = /\/(consent)\/*/i;

function MainLayout() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const { document } = useDocument();
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
        if (item.hiddenMenu) return null;
        let menu: ItemType = {
          key: item.haveChild ? `${item.path}-main` : item.path,
          icon: item.icons,
          label: item.name,
          children: []
        };

        const childMenu: any[] = [];
        if (item.haveChild) {
          const childItem = item.children || [];
          childItem.forEach((item) => {
            if (!item.hiddenMenu) {
              childMenu.push({
                key: item.path,
                label: item.name
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

  // on click button logout
  const onLogout = () => {
    setAuth(null);
  };

  const menu2 = (
    <Menu className={styles.menu2}>
      <Menu.Item>
        <div onClick={onLogout}>
          <IconLogout />
          {t('logout')}
        </div>
      </Menu.Item>
      <Menu.Item>
        <IconInfo />
        <Link to={'/help'}>{t('help')}</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="min-height">
      <Helmet>
        <title>{document.title}</title>
      </Helmet>

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
            }}>
            <div className={styles.logo}>
              <Logo />
            </div>
            <Menu
              onClick={onClickMenu}
              mode="inline"
              selectedKeys={defaultSelected}
              style={{ borderRight: 0 }}
              inlineCollapsed={!showSider}
              items={menus}
            />
            {menu2}
          </Sider>
        ) : (
          <Drawer
            className="sider-bar-drawer"
            placement="left"
            closable={false}
            bodyStyle={{ padding: 0 }}
            visible={showSider}
            onClose={() => {
              toggleSider && toggleSider();
            }}>
            <Menu
              onClick={onClickMenu}
              mode="inline"
              selectedKeys={defaultSelected}
              style={{ borderRight: 0 }}
              items={menus}
            />
            {menu2}
          </Drawer>
        )}

        {/** Main layout content */}
        <Layout className={styles.mainLayout}>
          <Content
            className="site-layout-background"
            style={{
              overflow: 'overlay'
            }}>
            {/** Header */}
            <MainHeader
              toggleSider={toggleSider}
              showSider={showSider}
              onLogout={onLogout}
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
