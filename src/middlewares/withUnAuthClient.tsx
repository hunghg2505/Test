import useAuth from 'hooks/redux/auth/useAuth';
import Loading from 'libraries/components/loading';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routePath } from 'routing/path.routing';

const withUnAuthClient = (WrapperComponent: any) => (props: any) => {
  const navigate = useNavigate();
  const { auth, isLogin } = useAuth();

  useEffect(() => {
    if (isLogin) {
      navigate(routePath.HomePage);
    }
  }, [isLogin]);

  if (!auth || !auth?.accessToken || !isLogin) {
    return <WrapperComponent {...props} />;
  }
  return <Loading />;
};

export default withUnAuthClient;
