import useAuth from 'hooks/redux/auth/useAuth';
import Loading from 'libraries/components/loading';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { routePath } from 'routing/path.routing';

const withAuthClient = (WrapperComponent: any) => (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();

  useEffect(() => {
    if (!auth || !auth.accessToken || auth.accessToken.length <= 0) {
      navigate(routePath.SignIn, {
        state: { callbackUrl: location.pathname }
      });
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, location]);

  if (auth) {
    return <WrapperComponent {...props} />;
  }
  return <Loading />;
};

export default withAuthClient;
