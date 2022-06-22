import useAuth from 'hooks/redux/auth/useAuth';
import Loading from 'libraries/components/loading';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routePath } from 'routing/path.routing';

const withUnAuthClient = (WrapperComponent: any) => (props: any) => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    if (auth && auth.accessToken && Object.keys(auth).length > 0) {
      navigate(routePath.HomePage);
    }
  }, [auth]);

  if (!auth || !auth?.accessToken) {
    return <WrapperComponent {...props} />;
  }
  return <Loading />;
};

export default withUnAuthClient;
