import { type FC, Suspense, useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'

import { HelmetLayout, RouteLoader } from 'components'

import routesList from './routes'

export const RoutesWrapper: FC = () => {
  const renderRoutes = useMemo(
    () =>
      routesList.map(({ element: Element, path, title }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<RouteLoader />}>
              <HelmetLayout title={title}>
                <Element />
              </HelmetLayout>
            </Suspense>
          }
        />
      )),
    []
  )

  return <Routes>{renderRoutes}</Routes>
}
