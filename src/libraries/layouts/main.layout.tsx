import { Layout, Menu, Grid, Drawer } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import useAuth from 'hooks/redux/auth/useAuth';
import useDocument from 'hooks/redux/document/useDocument';
import _ from 'lodash';
import withAuthClient from 'middlewares/withAuthClient';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import configRoutes, { IRouter } from 'routing/config.routing';
import MainFooter from './footer/main.footer';
import MainHeader from './header/main.header';
import styles from './styles.module.scss';

const { useBreakpoint } = Grid;
const collapsedWidth = '50px';

function MainLayout() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const { document } = useDocument();
  const location = useLocation();
  const screens = useBreakpoint();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configRoutes]);

  useEffect(() => {
    const path = location?.pathname;
    if (path) {
      const newDefaultSelected = [];
      newDefaultSelected.push(path);
      setDefaultSelected(newDefaultSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, menus]);

  // get list menu form router config
  const getMenu = (routes: IRouter[]) => {
    const newRouterConfig = _.cloneDeep(routes);
    const routerNotAuth = newRouterConfig.find((x) => x.isAuth === true);
    const menus: ItemType[] = [];
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

  return (
    <Layout className="max-height">
      <Helmet>
        <title>{document.title}</title>
      </Helmet>

      {/** Header */}
      <MainHeader
        toggleSider={toggleSider}
        showSider={showSider}
        onLogout={onLogout}
        user={auth?.user}
      />

      {/** Main Content */}
      <Layout className={styles.container}>
        {/** screen is desktop */}
        {screens.md ? (
          <Sider
            width={200}
            className={styles.siderView}
            collapsedWidth={screens.md ? collapsedWidth : 0}
            collapsed={!showSider !== undefined ? !showSider : false}
            onCollapse={() => {
              toggleSider && toggleSider();
            }}>
            <Menu
              onClick={onClickMenu}
              mode="inline"
              selectedKeys={defaultSelected}
              style={{ height: '100%', borderRight: 0 }}
              inlineCollapsed={!showSider}
              items={menus}
            />
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
              style={{ height: '100%', borderRight: 0 }}
              items={menus}
            />
          </Drawer>
        )}

        {/** Main layout content */}
        <Layout className={styles.mainLayout}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280
            }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      {/** Footer */}
      <MainFooter />
    </Layout>
  );
}

export default withAuthClient(MainLayout);
