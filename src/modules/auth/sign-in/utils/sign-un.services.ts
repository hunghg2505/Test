import { ResponseBase } from 'utils/api/api.types';
import ApiUtils from 'utils/api/api.utils';
import { SignInReq } from './sign-in.types';

const apiName = {
  sign_in: '/sign-in',
  video_stores: '/video-stores'
};

export const apiSignIn = async (body: SignInReq) => {
  const res = await ApiUtils.fetch<any, ResponseBase<any>>(apiName.sign_in, body);
  return res;
};
