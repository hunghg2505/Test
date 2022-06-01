import useDocument from 'hooks/redux/document/useDocument';
import withUnAuthClient from 'middlewares/withUnAuthClient';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';
import AuthFooter from './footer/auth.footer';
import AuthHeader from './header/auth.header';
import { Layout } from 'antd';
import styles from './styles.module.scss';

const Content = Layout.Content;
function AuthLayout() {
  const { document } = useDocument();

  return (
    <Layout className="max-height">
      <Helmet>
        <title>{document.title}</title>
      </Helmet>
      {/** Header */}
      <AuthHeader />

      {/** Main Content */}
      <Layout className={styles.mainLayout}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <Outlet />
        </Content>
      </Layout>

      {/** Footer */}
      <AuthFooter />
    </Layout>
  );
}

export default withUnAuthClient(AuthLayout);
