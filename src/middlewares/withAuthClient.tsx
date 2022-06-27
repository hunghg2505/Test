import useAuth from 'hooks/redux/auth/useAuth';
import Loading from 'libraries/components/loading';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { routePath } from 'routing/path.routing';

const withAuthClient = (WrapperComponent: any) => (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, isLogin } = useAuth();

  useEffect(() => {
    if (!isLogin) {
      navigate(routePath.SignIn, {
        state: { callbackUrl: location.pathname },
      });
    }
  }, [location, isLogin]);

  if (auth?.accessToken || isLogin) {
    return <WrapperComponent {...props} />;
  }
  return <Loading />;
};

export default withAuthClient;
