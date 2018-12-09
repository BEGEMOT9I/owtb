import React from 'react'
import { compose } from 'recompose'
import injectStyles, { JSSProps } from 'react-jss'
import classNames from 'classnames'

import styles from './styles'

export interface LoadingProps {
  className?: string
  color?: string
  background?: string
  duration?: number
  size?: string
  margin?: string
}

interface Props extends JSSProps<typeof styles>, LoadingProps {}

const Loading: React.StatelessComponent<Props> = ({ classes, className }) => (
  <div className={classNames(classes.spinner, className)} />
)

export default compose<Props, LoadingProps>(injectStyles(styles))(Loading)
