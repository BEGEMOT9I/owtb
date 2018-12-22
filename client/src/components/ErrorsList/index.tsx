import React, { SFC } from 'react'
import injectStyles, { JSSProps } from 'react-jss'

import styles from './styles'

interface OuterProps {
  errors: {
    [key: string]: string
  }
  show: boolean
}
interface Props extends JSSProps<typeof styles>, OuterProps {}

const ErrorsList: SFC<Props> = ({ errors, classes, show }) => {
  if (show) {
    if (errors.global) {
      return <div className={classes.errorMsg}>{errors.global}</div>
    }

    return (
      <ul className={classes.errorsList}>
        {Object.values(errors).map((error, index) => (
          <li key={`error-${index}`} className={classes.errorItem}>
            {error}
          </li>
        ))}
      </ul>
    )
  }

  return null
}

export default injectStyles<OuterProps>(styles)(ErrorsList)
