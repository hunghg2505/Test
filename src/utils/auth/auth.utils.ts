import axios from 'axios';
import localStorageUtils, { KeyStorage } from 'utils/local-storage.utils';

export const refreshTokenApi = async (): Promise<any> => {
  try {
    const tokenInfo: any = localStorageUtils.getObject(KeyStorage.AUTH, null);

    const params: any = {
      client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
      grant_type: 'refresh_token',
      refresh_token: tokenInfo?.refreshToken,
    };

    const data = Object.keys(params)
      .map((key: any) => `${key}=${encodeURIComponent(params[`${key}`])}`)
      .join('&');

    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data,
      url: 'https://abc-auth-dev.abc-dev.network/realms/master/protocol/openid-connect/token',
    };

    const res: any = await axios(options);

    const newTokenInfo: any = {
      accessToken: res?.data?.access_token,
      refreshToken: res?.data?.refresh_token,
      expireTime: Date.now() + res?.data?.expires_in * 1000,
      user: {
        loading: true,
      },
    };

    setTokenInfo({ ...tokenInfo, ...newTokenInfo });
    return res?.data?.access_token;
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
