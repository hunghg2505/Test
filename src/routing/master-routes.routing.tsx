import Loading from 'libraries/components/loading';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import configRoutes from './config.routing';

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
                <item.element />
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
                          <routeItem.element />
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
