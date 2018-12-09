import React, { StatelessComponent } from 'react'
import injectStyles, { JSSProps } from 'react-jss'
import { Transition, animated, config, SpringConfig } from 'react-spring'
import { compose } from 'recompose'

import Loading from 'components/Loading'
import styles from './styles'

interface OuterProps {
  show: boolean
  loaderSize?: number
}
export interface Props extends OuterProps, JSSProps<typeof styles> {}

const defaultConfig: SpringConfig = {
  ...config.slow,
  clamp: true
}
const LoadingOverlay: StatelessComponent<Props> = ({ classes, show, loaderSize }) => (
  <Transition
    items={show}
    config={defaultConfig}
    native
    from={{ opacity: 0, backgroundColor: 'rgba(255, 255, 255, 0)' }}
    enter={{ opacity: 1, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
    leave={{ opacity: 0, backgroundColor: 'rgba(255, 255, 255, 0)' }}
  >
    {show =>
      show &&
      (style => (
        <animated.div className={classes.overlay} style={style}>
          <Loading className={classes.loading} size={loaderSize ? `${loaderSize}px` : undefined} />
        </animated.div>
      ))
    }
  </Transition>
)

export default compose<Props, OuterProps>(injectStyles(styles))(LoadingOverlay)
