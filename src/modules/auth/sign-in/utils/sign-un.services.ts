import { API_PATH } from 'utils/api/constant';
import { ResponseBase } from 'utils/api/api.types';
import ApiUtils from 'utils/api/api.utils';
import { SignInReq } from './sign-in.types';

export const apiSignIn = async (body: SignInReq) => {
  const res = await ApiUtils.post<any, ResponseBase<any>>(API_PATH.LOGIN, body);
  return res;
};
