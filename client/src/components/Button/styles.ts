const styles = (theme: App.Theme) => ({
  button: {
    display: 'block',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    lineHeight: 1,
    textDecoration: 'none',
    borderRadius: '1rem',
    border: '1px solid',
    outline: 'none',
    boxShadow: 'none',
    boxSizing: 'border-box',
    cursor: 'pointer',
    transition:
      'opacity .15s linear, color 0.3s ease-out, background-color 0.3s ease-out, border-color 0.3s ease-out',
    '&:disabled': {
      opacity: 0.8,
      cursor: 'default'
    }
  },
  // button types specific
  defaultType: {
    ...theme.colors.button.default
  },
  primaryType: {
    ...theme.colors.button.primary
  },
  dangerType: {
    ...theme.colors.button.danger
  },
  transparentType: {
    ...theme.colors.button.transparent
  }
})

export default styles
