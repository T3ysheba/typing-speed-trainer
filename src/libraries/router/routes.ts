import { lazy } from 'react'

import { ERoutePaths, TRoutePageType } from './types'

const Error = lazy(() => import('pages/Error'))
const Home = lazy(() => import('pages/Home'))

const routesList: TRoutePageType[] = [
  {
    element: Error,
    path: ERoutePaths.Error,
    title: 'Error',
  },

  {
    element: Home,
    path: ERoutePaths.Home,
    title: 'Home',
  },
]

export default routesList
