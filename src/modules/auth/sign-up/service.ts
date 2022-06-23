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
        email: data.email?.trim(),
        username: data.name?.trim(),
        password: data.password?.trim(),
        firstName: data?.name?.trim() || 'abc',
        lastName: data?.firstName?.trim() || 'abc',
      });
    },
    {
      manual: true,
      onSuccess: (r) => {
        message.info('Sign up success');
        navigate(routePath.SignIn);
      },
      onError: (e: any) => {
        message.error(e?.content?.messageContent || 'Sign up error');
      },
    },
  );
};
