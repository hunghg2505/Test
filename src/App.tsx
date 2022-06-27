import { useKeycloak } from '@react-keycloak/web';
import useInitBase from 'hooks/useInitBase';
import Loading from 'libraries/components/loading';
import { Suspense, useLayoutEffect } from 'react';
import MasterRoute from 'routing/master-routes.routing';
import { KeyStorage } from 'utils/local-storage.utils';

function App() {
  useInitBase();
  const { keycloak, initialized } = useKeycloak();

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
