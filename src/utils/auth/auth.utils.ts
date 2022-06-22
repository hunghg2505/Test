import { API_PATH } from 'utils/api/constant';
import localStorageUtils, { KeyStorage } from 'utils/local-storage.utils';
import { instance } from '../api/api.utils';

export const refreshTokenApi = async (): Promise<any> => {
  try {
    const tokenInfo: any = localStorageUtils.getObject(KeyStorage.AUTH, null);

    const res: any = await instance.get(API_PATH.REFRESH_TOKEN, {
      headers: {
        Authorization: 'Bearer ' + tokenInfo?.refreshToken,
      },
    });

    const newTokenInfo: any = {
      accessToken: res?.content?.accessToken,
      refreshToken: res?.content?.refreshToken,
      expireTime: Date.now() + res?.content?.expireTime * 1000,
    };

    setTokenInfo({ ...tokenInfo, ...newTokenInfo });
    return res?.content?.accessToken;
  } catch (error) {
    // console.log('error refresh token', error);
  }
};

export const getTokenInfo = async () => {
  try {
    const tokenInfo: any = localStorageUtils.getObject(KeyStorage.AUTH, null);
    if (tokenInfo && tokenInfo?.accessToken) {
      return tokenInfo as any;
    }
  } catch (error) {
    setTokenInfo(null);
    return null;
  }
};

export const setTokenInfo = (tokenInfo: any | null) => {
  localStorageUtils.setObject(KeyStorage.AUTH, {
    ...tokenInfo,
  });
};
