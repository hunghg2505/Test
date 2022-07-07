import { API_PATH } from 'utils/api/constant';
import ApiUtils from 'utils/api/api.utils';
import { useRequest } from 'ahooks';
import { useKeycloak } from '@react-keycloak/web';
import { useDispatch, useSelector } from 'react-redux';
import localStorageUtils, { KeyStorage } from 'utils/local-storage.utils';
import { RootState } from 'utils/redux-store';
import { changeAuth, LocalAuth } from './reducer';

function useAuth() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { keycloak } = useKeycloak();

  const reqSaveUser = useRequest(
    async () => {
      return ApiUtils.post(API_PATH.AUTH_KEYCLOAK_SAVE_USER);
    },
    {
      manual: true,
    },
  );

  const setAuth = (data: LocalAuth | null) => {
    localStorageUtils.setObject(KeyStorage.AUTH, data);
    const actionChangeAuth = changeAuth(data);
    dispatch(actionChangeAuth);
  };

  const onLogin = () => keycloak.login();

  const onLogout = () => {
    localStorage.removeItem('save_login');
    localStorageUtils.remove(KeyStorage.AUTH);
    keycloak.logout();
  };

  return {
    auth,
    setAuth,
    isLogin: keycloak.authenticated,
    onLogin,
    onLogout,
    saveUser: reqSaveUser.run,
  };
}

export default useAuth;
