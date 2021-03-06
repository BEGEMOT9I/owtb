// Type definitions for application redux state
import { Route } from 'router5'

import AppTheme from 'lib/theme'

declare namespace App {
  type Theme = typeof AppTheme

  interface RouteProps {
    route?: Route
    previousRoute?: Route
  }
}

export = App
export as namespace App
