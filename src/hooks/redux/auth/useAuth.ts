import { API_PATH } from 'utils/api/constant';
import ApiUtils from 'utils/api/api.utils';
import { useRequest } from 'ahooks';
import { useKeycloak } from '@react-keycloak/web';
import { useDispatch, useSelector } from 'react-redux';
import localStorageUtils, { KeyStorage } from 'utils/local-storage.utils';
import { RootState } from 'utils/redux-store';
import { changeAuth, LocalAuth } from './reducer';
import { TRoles } from 'types/common.types';

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

  const reqGetProfile = useRequest(
    async () => {
      return ApiUtils.fetch(API_PATH.GET_USERS_FEATURES);
    },
    {
      manual: true,
      onSuccess: (r: any) => {
        localStorageUtils.remove(KeyStorage.GET_PROFILE);
        const data: LocalAuth = localStorageUtils.getObject(KeyStorage.AUTH);

        const actionChangeAuth = changeAuth({
          ...data,
          user: {
            email: '',
            roles: r?.content as TRoles,
            loading: false,
          },
        });
        dispatch(actionChangeAuth);
      },
      onError: (err) => {
        localStorageUtils.remove(KeyStorage.GET_PROFILE);
        console.log('get profile err', err);
      },
      refreshDeps: [auth],
    },
  );

  const setAuth = (data: LocalAuth | null) => {
    localStorageUtils.setObject(KeyStorage.AUTH, data);
    const actionChangeAuth = changeAuth(data);
    dispatch(actionChangeAuth);
  };

  const onLogin = () => keycloak.login();

  const onLogout = () => {
    localStorageUtils.remove(KeyStorage.SAVE_LOGIN);
    localStorageUtils.remove(KeyStorage.GET_PROFILE);
    localStorageUtils.remove(KeyStorage.AUTH);

    keycloak.logout();
  };

  return {
    auth,
    setAuth,
    isLogin: keycloak.authenticated,
    onLogin,
    onLogout,
    saveUser: reqSaveUser.runAsync,
    getProfile: reqGetProfile.run,
  };
}

export default useAuth;
