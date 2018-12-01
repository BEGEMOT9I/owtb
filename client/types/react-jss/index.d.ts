declare module 'react-jss' {
  import { Style, StyleSheet } from 'jss'

  type ComponentStyles = Style | StyleSheet<any>
  
  // JSS
  export declare type JSSClasses<Styles> = Styles extends Function
    ? { [K in keyof ReturnType<Styles>]: string }
    : { [K in keyof Styles]: string }
  export interface JSSPropsWithoutTheme<Styles> {
    classes: JSSClasses<Styles>
  }
  export interface JSSProps<Styles> {
    classes: JSSClasses<Styles>
    theme: App.Theme
  }

  interface injectStylesOptions {}

  interface InjectStyles<P> {
    (Component: React.ComponentType<P>): React.ComponentType<P>
  }

  function injectStyles<P extends {}>(
    styles: ComponentStyles,
    options?: { inject?: string[] }
  ): InjectStyles<P>

  export function withTheme<P extends {}>(Component: React.ComponentType<P>): React.ComponentType<P>

  export class SheetsRegistry {
    toString(): string
  }
  export class JssProvider extends React.Component<{ registry: Object }> {}
  export class ThemeProvider extends React.Component<{ theme: Object }> {}

  export default injectStyles
}
