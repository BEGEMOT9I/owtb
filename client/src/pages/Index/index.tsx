import React, { Component, Fragment } from 'react'
import { compose } from 'recompose'
import injectStyles, { JSSProps } from 'react-jss'
import { hot } from 'react-hot-loader'

import AppHelmet from 'components/AppHelmet'
import styles from './styles'

interface OuterProps extends App.RouteProps {}
interface Props extends OuterProps, JSSProps<typeof styles> {}
interface State {}

class IndexPage extends Component<Props, State> {
  render() {
    return (
      <Fragment>
        <AppHelmet title="Главная" />
        <section>
          <h1>Hello</h1>
        </section>
      </Fragment>
    )
  }
}

export default compose<Props, OuterProps>(
  hot(module),
  injectStyles(styles)
)(IndexPage)
