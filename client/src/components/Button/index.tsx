import React, { StatelessComponent, ButtonHTMLAttributes, ReactChild } from 'react'
import { Link } from 'react-router5'
import classnames from 'classnames'
import injectStyles, { JSSProps } from 'react-jss'

import styles from './styles'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: string // 'default' | 'primary' | 'danger' | 'transparent'
  className?: string
  children: ReactChild
  htmlType?: string
  routeName?: string
  target?: string
  isLink?: boolean
}
interface Props extends ButtonProps, JSSProps<typeof styles> {}
interface HOCProps {
  className: string
  children: any
  htmlType?: string
}

const ButtonHOC: StatelessComponent<HOCProps> = ({ className, children, htmlType, ...props }) => (
  <button type={htmlType} className={className} {...props}>
    {children}
  </button>
)

const components = {
  button: ButtonHOC,
  link: Link
}

const Button: StatelessComponent<Props> = ({
  type,
  className,
  classes,
  children,
  htmlType,
  routeName,
  isLink,
  theme,
  ...props
}) => {
  const Component = isLink ? components.link : components.button
  const ButtonProps = {
    htmlType
  }
  const LinkProps = {
    routeName
  }

  return (
    <Component
      className={classnames(classes.button, className, {
        [classes.defaultType]: type === 'default',
        [classes.primaryType]: type === 'primary',
        [classes.dangerType]: type === 'danger',
        [classes.transparentType]: type === 'transparent'
      })}
      {...(isLink ? LinkProps : ButtonProps)}
      {...props}
    >
      {children}
    </Component>
  )
}

Button.defaultProps = {
  type: 'default',
  isLink: false
}

export default injectStyles<ButtonProps>(styles)(Button)
