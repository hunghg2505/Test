import { API_PATH } from 'utils/api/constant';
import localStorageUtils, { KeyStorage } from 'utils/local-storage.utils';
import ApiUtils from '../api/api.utils';

const refreshTokenApi = (): Promise<any> => {
  return ApiUtils.fetch(API_PATH.REFRESH_TOKEN);
};

export const getTokenInfo = async () => {
  try {
    const tokenInfo: any = localStorageUtils.getObject(KeyStorage.AUTH, null);
    if (tokenInfo && tokenInfo?.accessToken) {
      const timeRefreshToken = Date.now() + 60 * 1000;
      const expireTime = tokenInfo.expiresAt || 0;
      if (timeRefreshToken < expireTime) {
        return { ...tokenInfo };
      } else {
        if (tokenInfo.refreshToken) {
          const result = await refreshTokenApi();
          if (result) {
            const newTokenInfo: any = {
              accessToken: result?.data?.accessToken,
              refreshToken: result?.data?.refresh_token,
              expiresAt: result?.data?.expiresTime
            };
            setTokenInfo({ ...newTokenInfo });
            return newTokenInfo;
          }
        }
      }
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
    expiresAt: Date.now() + Number(tokenInfo?.expiresAt) * 1000
  });
};
