import React, { Component, CSSProperties } from 'react'
import classnames from 'classnames'
import injectStyles, { JSSProps } from 'react-jss'

import styles from './styles'

export interface OuterProps {
  color?: string
  background?: string
  size?: string
  margin?: string
  style?: CSSProperties
  className?: string
  // Time in ms between mounting and rendering
  // mainly to prevent flickering
  delay?: number
}
export interface Props extends OuterProps, JSSProps<typeof styles> {}

interface State {
  pastDelay: boolean
}

class Loading extends Component<Props, State> {
  delayTimeout: any
  static defaultProps: Partial<Props> = {
    delay: 300
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      pastDelay: !!props.delay && props.delay > 0 ? false : true
    }
  }

  componentDidMount() {
    if (!this.state.pastDelay)
      this.delayTimeout = setTimeout(() => this.setState({ pastDelay: true }), this.props.delay)
  }
  componentWillUnmount() {
    clearTimeout(this.delayTimeout)
  }

  render() {
    const { classes, style, className } = this.props
    const { pastDelay } = this.state

    return (
      pastDelay && (
        <div className={classnames(classes.container, className)} style={style}>
          <div className={classes.loading} />
        </div>
      )
    )
  }
}
const LoadingComponent = injectStyles<OuterProps>(styles)(Loading)

export const LoadingWrapped: React.StatelessComponent<OuterProps> = ({ style, className }) => (
  <div
    style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <LoadingComponent />
  </div>
)

export default LoadingComponent
