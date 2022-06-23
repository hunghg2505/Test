import { useKeycloak } from '@react-keycloak/web';
import useInitBase from 'hooks/useInitBase';
import { useLayoutEffect } from 'react';
import MasterRoute from 'routing/master-routes.routing';
import { KeyStorage } from 'utils/local-storage.utils';

function App() {
  useInitBase();
  const { keycloak } = useKeycloak();

  useLayoutEffect(() => {
    const authData = {
      accessToken: keycloak?.token,
      refreshToken: keycloak?.refreshToken,
      expireTime: null,
    };

    localStorage.setItem(KeyStorage.AUTH, JSON.stringify(authData));
  }, [keycloak?.token, keycloak?.refreshToken]);

  return <MasterRoute />;
}

export default App;
