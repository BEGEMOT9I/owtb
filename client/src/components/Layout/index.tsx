import React, { Component } from 'react'
import injectStyles, { JSSProps } from 'react-jss'

import AppHelmet from 'components/AppHelmet'
import styles from './styles'

interface Props extends JSSProps<typeof styles> {
  children: React.ReactNode
}

class Layout extends Component<Props, {}> {
  render() {
    const { children, classes } = this.props

    return (
      <main className={classes.layout}>
        <AppHelmet />
        {children}
      </main>
    )
  }
}

export default injectStyles(styles)(Layout)
