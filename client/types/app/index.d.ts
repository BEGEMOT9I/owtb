// Type definitions for application redux state
import { Route } from 'router5'
import { Theme } from '@material-ui/core/styles/createMuiTheme'

declare namespace App {
  type Theme = Theme

  interface RouteProps {
    route?: Route
    previousRoute?: Route
  }
}

export = App
export as namespace App
