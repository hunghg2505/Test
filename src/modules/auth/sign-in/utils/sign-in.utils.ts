import { message } from 'antd';
import { useRequest } from 'ahooks';
import useAuth from 'hooks/redux/auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { routePath } from 'routing/path.routing';
import { ResponseCode } from 'utils/api/api.types';
import { SignInReq } from './sign-in.types';
import { apiSignIn } from './sign-un.services';

interface Utils {
  onLogin: (values: any) => void;
  onGoToRegister: () => void;
  onGoToForgotPassword: () => void;
  loadingSignIn: boolean;
}

export default function SignInUtils(): Utils {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  // when on click button submit login
  const reqLogin = useRequest(
    async (values: any) => {
      const body: SignInReq = {
        username: values?.email_abc,
        password: values?.password_abc
      };
      // call api here
      return apiSignIn(body);
    },
    {
      manual: true,
      onSuccess: (r: any, params) => {
        const values = params[0];
        if (r.code === ResponseCode.SUCCESS) {
          console.log('login success');
        }

        setAuth({
          accessToken: r?.content?.accessToken,
          refreshToken: r?.content?.refreshToken,
          expireTime: Date.now() + r?.content?.expireTime * 1000,
          user: {
            email: values?.email_abc
          }
        });
      },
      onError: (err: any) => {
        message.error(err?.content?.messageContent || 'Login Failed');
      }
    }
  );

  // go to register page
  const onGoToRegister = () => {
    navigate(routePath.SignUp);
  };

  // go to forgot password page
  const onGoToForgotPassword = () => {
    navigate(routePath.ForgotPassword);
  };

  return {
    loadingSignIn: reqLogin.loading,
    onLogin: reqLogin.run,
    onGoToRegister,
    onGoToForgotPassword
  };
}
