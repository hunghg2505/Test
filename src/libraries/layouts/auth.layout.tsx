import { Layout } from 'antd';
import withUnAuthClient from 'middlewares/withUnAuthClient';
import { Outlet } from 'react-router-dom';
import AuthHeader from './header/auth.header';
import SEO from './SEO';
import styles from './styles.module.scss';

const Content = Layout.Content;
function AuthLayout() {
  return (
    <Layout className='min-height'>
      <SEO />
      {/** Header */}
      <AuthHeader />

      {/** Main Content */}
      <Layout className={styles.mainLayout}>
        <Content
          className={styles.layoutAuthContent}
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>

      {/** Footer */}
      {/* <AuthFooter /> */}
    </Layout>
  );
}

export default withUnAuthClient(AuthLayout);
