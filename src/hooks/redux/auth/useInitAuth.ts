import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routePath } from 'routing/path.routing';
import localStorageUtils, { KeyStorage } from 'utils/local-storage.utils';
import useAuth from './useAuth';

interface Config {
  logged?: {
    redirect?: boolean;
  };
  noLogged?: {
    redirect?: boolean;
  };
}

function useInitAuth(config?: Config): void {
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    if (!auth || !auth.accessToken) {
      localStorageUtils.remove(KeyStorage.AUTH);
      if (config?.noLogged?.redirect) {
        navigate(routePath.HomePage);
      }
    } else {
      localStorageUtils.setObject(KeyStorage.AUTH, auth);
      if (config?.logged?.redirect) {
        navigate(routePath.HomePage);
      }
    }
  }, [auth]);
}

export default useInitAuth;
