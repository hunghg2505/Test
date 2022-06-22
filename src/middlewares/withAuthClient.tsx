import useAuth from 'hooks/redux/auth/useAuth';
import Loading from 'libraries/components/loading';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { routePath } from 'routing/path.routing';
import { useKeycloak } from '@react-keycloak/web';

const withAuthClient = (WrapperComponent: any) => (props: any) => {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  const isLoggedIn = keycloak.authenticated;

  useEffect(() => {
    // if (!auth || !auth.accessToken || auth.accessToken.length <= 0) {
    //   navigate(routePath.SignIn, {
    //     state: { callbackUrl: location.pathname }
    //   });
    //   return;
    // }
    if (!isLoggedIn) {
      navigate(routePath.SignIn, {
        state: { callbackUrl: location.pathname }
      });
    }
  }, [auth, location, isLoggedIn]);

  if (auth || isLoggedIn) {
    return <WrapperComponent {...props} />;
  }
  return <Loading />;
};

export default withAuthClient;
