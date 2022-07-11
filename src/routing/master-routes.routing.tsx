import useAuth from 'hooks/redux/auth/useAuth';
import Loading from 'libraries/components/loading';
import React, { Suspense, useCallback } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { PERMISSIONS } from 'types/common.types';
import configRoutes from './config.routing';
import { routePath } from './path.routing';

const hasPermissionViewPage = (exitsRoles: any, permissionConst: string) => {
  return exitsRoles?.find((item: any) => {
    const isHasPermission = item?.permissions?.find(
      (v: any) => v?.permissionId === permissionConst,
    );
    if (isHasPermission) return true;
    return false;
  });
};

export const getPermissionView = ({ path, exitsRoles }: any) => {
  try {
    if (path === routePath.Profile) {
      const hasPermissionsUserViews = hasPermissionViewPage(
        exitsRoles,
        PERMISSIONS.PDPA_UserProfile_View,
      );

      if (!hasPermissionsUserViews) return false;
    }

    if (path === routePath.DataSubjectDetail || path === routePath.DataSubjectManagement) {
      const hasPermissionsUserViews = hasPermissionViewPage(
        exitsRoles,
        PERMISSIONS.PDPA_DataSubjectManagement_View,
      );

      if (!hasPermissionsUserViews) return false;
    }

    if (path === routePath.CaseManagement) {
      const hasPermissionsUserViews = hasPermissionViewPage(
        exitsRoles,
        PERMISSIONS.PDPA_ConsentManagement_View,
      );

      if (!hasPermissionsUserViews) return false;
    }

    if (path === routePath.AssignToYou) {
      const hasPermissionsUserViews = hasPermissionViewPage(
        exitsRoles,
        PERMISSIONS.PDPA_CaseManagement_ViewAssignedTo,
      );

      if (!hasPermissionsUserViews) return false;
    }
    if (path === routePath.SearchCase) {
      const hasPermissionsUserViews = hasPermissionViewPage(
        exitsRoles,
        PERMISSIONS.PDPA_CaseManagement_ViewSearchCase,
      );

      if (!hasPermissionsUserViews) return false;
    }

    if (path === routePath.ConsentDetail || path === routePath.ConsentManagement) {
      const hasPermissionsUserViews = hasPermissionViewPage(
        exitsRoles,
        PERMISSIONS.PDPA_ConsentManagement_View,
      );

      if (!hasPermissionsUserViews) return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

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
