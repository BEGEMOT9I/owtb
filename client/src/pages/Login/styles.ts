const styles = (theme: App.Theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  title: {
    width: '100%',
    marginTop: 0,
    marginBottom: '0.125rem',
    fontSize: '1.75rem',
    color: '#000000',
    textAlign: 'center'
  },
  formWrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 350,
    width: '100%',
    padding: '1rem 1rem 1rem 1rem',
    backgroundColor: theme.colors.contrastBackground,
    borderRadius: 2,
    boxSizing: 'border-box'
  },
  form: {
    position: 'relative',
    width: '100%'
  },
  field: {
    width: '100%',
    marginTop: '0.3125rem'
  },
  errorMsg: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: '1rem',
    width: '100%'
  },
  submitButton: {
    margin: '0 auto',
    marginTop: '0.5rem'
  }
})

export default styles
