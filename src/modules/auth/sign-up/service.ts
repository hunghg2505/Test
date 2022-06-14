import { routePath } from './../../../routing/path.routing';
import ApiUtils from 'utils/api/api.utils';
import { useRequest } from 'ahooks';
import { API_PATH } from 'utils/api/constant';
import { ResponseBase } from 'utils/api/api.types';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

type TSignUp = {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

const serviceSignUp = async (body: TSignUp) => {
  return ApiUtils.post<any, ResponseBase<any>>(API_PATH.SIGN_UP, body);
};

export const useSignUp = () => {
  const navigate = useNavigate();

  return useRequest(
    async (data: any) => {
      return serviceSignUp({
        email: data.email,
        username: data.name,
        password: data.password,
        firstName: data.firstName || 'abc',
        lastName: data.firstName || 'abc'
      });
    },
    {
      manual: true,
      onSuccess: (r) => {
        console.log('sign up success', r);
        message.info('Sign up success');
        navigate(routePath.SignIn);
      },
      onError: (e: any) => {
        console.log('sign up error', e);
        message.error(e?.content?.messageContent || 'Sign up error');
      }
    }
  );
};
