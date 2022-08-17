import useAuth from 'hooks/redux/auth/useAuth';
import Loading from 'libraries/components/loading';
import React, { Suspense, useCallback } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { getPermissionView } from 'utils/common.utils';
import configRoutes from './config.routing';

const Authority = ({ roles, Render, path }: any) => {
  const { auth, isLogin } = useAuth();
  const navigate = useNavigate();

  if (auth?.user?.loading && isLogin) {
    return <Loading />;
  }

  if (roles && roles.length && isLogin) {
    if (roles?.includes('@')) return <Render />;

    const isPermissionView = getPermissionView({ path, exitsRoles: auth?.user?.roles });

    if (!isPermissionView) {
      setTimeout(() => navigate('/'), 100);
      return null;
    }

    return <Render />;
  }

  return <Render />;
};

const LazyRoute = ({ roles, element, path }: any) => {
  const Render = useCallback(
    (props: any) => {
      return React.createElement(element, props);
    },
    [element],
  );

  return <Authority Render={Render} roles={roles} path={path} />;
};

export default function MasterRoute() {
  return (
    <Routes>
      {configRoutes.map((item, index) => {
        const routes = item.children;
        return (
          <Route
            path={item.path}
            element={
              <Suspense fallback={<Loading />}>
                <LazyRoute roles={item?.roles} element={item.element} path={item.path} />
              </Suspense>
            }
            key={index}
          >
            {routes && routes.length > 0
              ? routes.map((routeItem, routeIndex) => {
                  return (
                    <Route
                      path={routeItem.path}
                      element={
                        <Suspense fallback={<Loading />}>
                          <LazyRoute
                            roles={routeItem?.roles}
                            element={routeItem.element}
                            path={routeItem.path}
                          />
                        </Suspense>
                      }
                      key={`${index}-${routeIndex}`}
                    />
                  );
                })
              : null}
          </Route>
        );
      })}
    </Routes>
  );
}
