import useAuth from 'hooks/redux/auth/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routePath } from 'routing/path.routing';
import { SignInReq } from './sign-in.types';

interface Utils {
  onLogin: (values: any) => void;
  onGoToRegister: () => void;
  onGoToForgotPassword: () => void;
}

export default function SignInUtils(): Utils {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [loadingSignIn, setLoadingSignIn] = useState<boolean>(false);

  // when on click button submit login
  const onLogin = async (values: any) => {
    try {
      if (loadingSignIn) return;
      setLoadingSignIn(true);
      const body: SignInReq = {
        email: values?.email_abc,
        password: values?.password_abc
      };
      // call api here

      // const res = await apiSignIn(body);
      // if(res.code === ResponseCode.SUCCESS) {
      //   console.log('login success')
      // }
      setAuth({
        token: 'thisIsToken',
        user: {
          email: body.email
        }
      });
      setLoadingSignIn(true);
    } catch (error) {
      setLoadingSignIn(false);
    }
  };

  // go to register page
  const onGoToRegister = () => {
    navigate(routePath.SignUp);
  };

  // go to forgot password page
  const onGoToForgotPassword = () => {
    navigate(routePath.ForgotPassword);
  };

  return {
    onLogin,
    onGoToRegister,
    onGoToForgotPassword
  };
}
