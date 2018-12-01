import React from 'react'
import { compose } from 'recompose'
import injectStyles, { JSSProps } from 'react-jss'

import styles from './styles'

export interface LoadingProps {
  color?: string
  background?: string
  duration?: number
  size?: string
  margin?: string
}

interface Props extends JSSProps<typeof styles>, LoadingProps {}

const Loading: React.StatelessComponent<Props> = ({ classes }) => (
  <div className={classes.spinner} />
)

export default compose<Props, LoadingProps>(injectStyles(styles))(Loading)
