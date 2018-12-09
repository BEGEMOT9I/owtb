import { Props } from './index'

const styles = (theme: App.Theme) => ({
  container: {
    position: 'relative',
    fontSize: '1rem',
    opacity: ({ disabled }: Props) => (disabled ? 0.5 : 1),
    transition: 'opacity 0.3s ease-out'
  },
  content: {
    position: 'relative',
    width: '100%',
    padding: ({ label }: Props) =>
      `${label ? '0.3125em' : '0.625em'} 0.625em ${label ? '0.3125em' : '0.625em'} 0.625em`,
    fontSize: '1rem',
    lineHeight: 0,
    boxSizing: 'border-box',
    border: ({ meta: { error, touched } }: Props) =>
      `1px solid ${error && touched ? theme.colors.error : theme.colors.input.border}`,
    borderRadius: '0.5rem'
  },
  input: {
    width: '100%',
    marginTop: ({ label }: Props) => (label ? '0.3125em' : 0),
    padding: 0,
    fontWeight: 'normal',
    fontSize: '1em',
    lineHeight: 1.2,
    color: '#000',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    '&::placeholder': {
      color: theme.colors.grey
    }
  },
  label: {
    position: 'relative',
    display: 'inline-block',
    color: theme.colors.grey,
    fontSize: '0.625em',
    lineHeight: 1,
    fontWeight: 'normal',
    letterSpacing: 0.5,
    cursor: 'text',
    transform: 'translateY(0) scale(1)',
    transformOrigin: '0 0',
    transition: 'transform 0.15s ease-out'
  },
  error: {
    display: 'inline-block',
    padding: '0.625em',
    color: theme.colors.error,
    fontSize: '0.75rem'
  }
})

export default styles
