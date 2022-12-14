import { Grid, Layout, Menu } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import Logo from 'assets/icons/logo';
import clsx from 'clsx';
import useAuth from 'hooks/redux/auth/useAuth';
import withAuthClient from 'middlewares/withAuthClient';
import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import configRoutes from 'routing/config.routing';
import { getMenu } from 'utils/get-menu.utils';
import MainHeader from './header/MainHeader';
import SEO from './SEO';
import styles from './styles.module.scss';

const { useBreakpoint } = Grid;

function MainLayout() {
  const navigate = useNavigate();
  const { auth, onLogout } = useAuth();
  const location = useLocation();
  const { hash } = useParams();
  const screens = useBreakpoint();

  const [menus, setMenus] = useState<ItemType[]>([]);

  const [defaultSelected, setDefaultSelected] = useState<string[]>([]);

  const [showSider, setShowSider] = useState(true);

  useEffect(() => {
    if (screens.md) {
      setShowSider(true);
      return;
    }
    setShowSider(false);
  }, [screens]);

  useEffect(() => {
    const newMenu: any = getMenu(configRoutes, auth);
    setMenus(newMenu);
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

  const onClickMenu = (event: any) => {
    navigate(event.key);
  };

  const MenuFooter = () => {
    return (
      <Menu
        className={styles.menu2}
        onClick={(e) => {
          if (e.key === '/logout') return onLogout();
          navigate(e.key);
        }}
        items={[]}
      />
    );
  };

  const checkHiddenMenu = useMemo(
    () =>
      !location.pathname?.includes('consent') &&
      !location.pathname?.includes('data-subject') &&
      !location.pathname?.includes('user-management') &&
      !location.pathname?.includes('system-configuration') &&
      hash,
    [location.pathname],
  );

  return (
    <Layout className='min-height'>
      <SEO />

      <Layout className={styles.container}>
        <Sider
          width={285}
          className={clsx(styles.siderView, {
            [styles.hiddenMenu]: checkHiddenMenu,
          })}
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

        <Layout className={styles.mainLayout}>
          <Content
            className='site-layout-background'
            style={{
              overflow: 'overlay',
            }}
          >
            <MainHeader showSider={showSider} user={auth?.user} isMobile={!!screens.md} />
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default withAuthClient(MainLayout);
