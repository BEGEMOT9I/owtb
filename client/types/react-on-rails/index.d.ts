declare module 'react-on-rails' {
  import { Store } from 'redux'

  interface RegisterStoreOptions {
    [storeName: string]: (initialState: any) => Store<{}>
  }
  interface RegisterOptions {
    [componentName: string]: Function
  }
  interface RailsContext {
    pathname: string
  }

  export function registerStore(opts: RegisterStoreOptions): void

  export function register(opts: RegisterOptions): void

  export function getStore(name: string): Store<App.State>
}
