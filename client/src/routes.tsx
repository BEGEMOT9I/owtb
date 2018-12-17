import React from 'react'
import { Route, constants } from 'router5'
import universal from 'react-universal-component'

import Loading from 'components/Loading'

export const routes: Route[] = [
  { name: 'index', path: '/' },
  { name: 'login', path: '/login' },
  { name: 'registration', path: '/registration' }
]

const universalRoute = (loadSpec, options = {}) =>
  universal<App.RouteProps>(loadSpec, {
    loading: props => <Loading />,
    minDelay: 0,
    loadingTransition: false,
    ...options
  })

export const routeComponents: { [key: string]: ReturnType<typeof universalRoute> } = {
  index: universalRoute(import('./pages/Index')),
  login: universalRoute(import('./pages/Login')),
  registration: universalRoute(import('./pages/Registration')),
  [constants.UNKNOWN_ROUTE]: universalRoute(import('./pages/NotFound'))
}

export const getRouteComponent = (name: string) => routeComponents[name]
