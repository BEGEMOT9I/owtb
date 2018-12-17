import React, { PureComponent, InputHTMLAttributes, ChangeEvent } from 'react'
import injectStyles, { JSSProps } from 'react-jss'
import { FieldRenderProps } from 'react-final-form'
import classNames from 'classnames'

import styles from './styles'

interface OuterProps extends InputHTMLAttributes<HTMLInputElement>, FieldRenderProps {
  className?: string
  inputClassName?: string
  placeholder?: string
  type?: string
  label?: string
  withoutDelay?: boolean
}
export interface Props extends OuterProps, JSSProps<typeof styles> {}
interface State {}

class TextInput extends PureComponent<Props, State> {
  render() {
    const {
      classes,
      theme,
      inputClassName,
      id,
      className,
      label,
      placeholder,
      type = 'text',
      input: { name, value, onChange, ...input },
      meta: { error, touched },
      disabled
    } = this.props

    return (
      <div className={classNames(classes.container, className)}>
        <div className={classes.content}>
          {!!label && (
            <label className={classes.label} htmlFor={id || name}>
              {label}
            </label>
          )}
          <input
            id={id || name}
            type={type}
            placeholder={placeholder}
            className={classNames(classes.input, inputClassName)}
            value={value}
            disabled={disabled}
            onChange={onChange}
            {...input}
          />
        </div>
        {touched && error && <span className={classes.error}>{error}</span>}
      </div>
    )
  }
}

export default injectStyles<OuterProps>(styles)(TextInput)
