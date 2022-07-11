import { useKeycloak } from '@react-keycloak/web';
import useInitBase from 'hooks/useInitBase';
import Loading from 'libraries/components/loading';
import { Suspense, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MasterRoute from 'routing/master-routes.routing';
import { KeyStorage } from 'utils/local-storage.utils';
import { clearCache, useUpdateEffect } from 'ahooks';
import useAuth from 'hooks/redux/auth/useAuth';

function App() {
  useInitBase();
  const { keycloak, initialized } = useKeycloak();
  const location = useLocation();
  const { saveUser, getProfile } = useAuth();

  useUpdateEffect(() => {
    const isLogin = localStorage.getItem('save_login');

    if (initialized && keycloak?.token && !isLogin) {
      localStorage.setItem('save_login', 'true');
      saveUser();
    }
  }, [initialized, keycloak?.token]);

  useUpdateEffect(() => {
    const isGetProfile = localStorage.getItem('get_profile');

    if (initialized && keycloak?.token && !isGetProfile) {
      localStorage.setItem('get_profile', 'true');
      getProfile();
    }
  }, [initialized, keycloak?.token]);

  useLayoutEffect(() => {
    if (!location.pathname?.includes('data-subject')) {
      clearCache(['data-management']);
    }
  }, [location.pathname]);

  useLayoutEffect(() => {
    const authData = {
      accessToken: keycloak?.token,
      refreshToken: keycloak?.refreshToken,
      expireTime: null,
    };

    localStorage.setItem(KeyStorage.AUTH, JSON.stringify(authData));
  }, [keycloak?.token, keycloak?.refreshToken]);

  if (!initialized) return <Loading />;

  return (
    <Suspense fallback={<Loading />}>
      <MasterRoute />
    </Suspense>
  );
}

export default App;
