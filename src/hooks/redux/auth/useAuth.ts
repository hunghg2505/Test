import { useKeycloak } from '@react-keycloak/web';
import { useDispatch, useSelector } from 'react-redux';
import localStorageUtils, { KeyStorage } from 'utils/local-storage.utils';
import { RootState } from 'utils/redux-store';
import { changeAuth, LocalAuth } from './reducer';

function useAuth() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { keycloak } = useKeycloak();

  const setAuth = (data: LocalAuth | null) => {
    localStorageUtils.setObject(KeyStorage.AUTH, data);
    const actionChangeAuth = changeAuth(data);
    dispatch(actionChangeAuth);
  };

  const onLogin = () => keycloak.login();

  const onLogout = () => keycloak.logout();

  return {
    auth,
    setAuth,
    isLogin: keycloak.authenticated,
    onLogin,
    onLogout,
  };
}

export default useAuth;
