import { useKeycloak } from '@react-keycloak/web';
import useInitBase from 'hooks/useInitBase';
import Loading from 'libraries/components/loading';
import { Suspense, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MasterRoute from 'routing/master-routes.routing';
import { KeyStorage } from 'utils/local-storage.utils';
import { clearCache, useUpdateEffect } from 'ahooks';
import useAuth from 'hooks/redux/auth/useAuth';

const clearCacheData = (condition: boolean, key: any) => {
  return condition && clearCache(key);
};

const onSaveUsers = async ({ isLogin, saveUser }: any) => {
  if (!isLogin) {
    localStorage.setItem('save_login', 'true');
    return saveUser();
  }
};

const onGetProfile = async ({ isGetProfile, getProfile }: any) => {
  if (!isGetProfile) {
    localStorage.setItem('get_profile', 'true');
    return getProfile();
  }
};

function App() {
  useInitBase();
  const { keycloak, initialized } = useKeycloak();
  const location = useLocation();
  const { saveUser, getProfile } = useAuth();

  useUpdateEffect(() => {
    (async () => {
      if (!(initialized && keycloak?.token)) return;

      const isLogin = localStorage.getItem('save_login');
      const isGetProfile = localStorage.getItem('get_profile');

      await onSaveUsers({ isLogin, saveUser });
      await onGetProfile({ isGetProfile, getProfile });
    })();
  }, [initialized, keycloak?.token]);

  useLayoutEffect(() => {
    clearCacheData(!location.pathname?.includes('data-subject'), ['data-management']);
    clearCacheData(!location.pathname?.includes('case-management'), [
      'search-case-management',
      'case-assign-management',
    ]);
    clearCacheData(location.pathname === '/case-management/assign-to-you', [
      'search-case-management',
    ]);
    clearCacheData(location.pathname === '/case-management/search-case', [
      'case-assign-management',
    ]);
    clearCacheData(!location.pathname?.includes('consent'), ['consent-management']);
  }, [location.pathname]);

  useLayoutEffect(() => {
    const authData = {
      accessToken: keycloak?.token,
      refreshToken: keycloak?.refreshToken,
      expireTime: null,
      user: {
        loading: true,
      },
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
