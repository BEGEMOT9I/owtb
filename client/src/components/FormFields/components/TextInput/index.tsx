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
interface State {
  value: string
}

class TextInput extends PureComponent<Props, State> {
  timeout: NodeJS.Timer

  constructor(props: Props) {
    super(props)

    this.state = {
      value: props.input.value
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.input.value !== this.props.input.value) {
      this.setState({ value: nextProps.input.value })
    }
  }

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      input: { onChange },
      withoutDelay
    } = this.props
    const value = event.target.value

    this.setState({ value })

    if (withoutDelay) {
      onChange(value)
    } else {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }

      this.timeout = setTimeout(() => onChange(value), 250)
    }
  }

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
      input: { onChange, value, ...input },
      meta: { error, touched },
      disabled
    } = this.props
    console.log(input.name, touched, error, value)

    return (
      <div className={classNames(classes.container, className)}>
        <div className={classes.content}>
          {!!label && (
            <label className={classes.label} htmlFor={id || input.name}>
              {label}
            </label>
          )}
          <input
            id={id || input.name}
            type={type}
            placeholder={placeholder}
            className={classNames(classes.input, inputClassName)}
            value={this.state.value}
            disabled={disabled}
            onChange={this.onChange}
            {...input}
          />
        </div>
        {touched && error && <span className={classes.error}>{error}</span>}
      </div>
    )
  }
}

export default injectStyles<OuterProps>(styles)(TextInput)
