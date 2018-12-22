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
    paddingTop: '1rem',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 2,
    boxSizing: 'border-box'
  },
  form: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '0rem 1rem 1rem 1rem',
    boxSizing: 'border-box'
  },
  field: {
    width: '100%',
    marginTop: '0.5rem'
  },
  errorMsg: {
    color: theme.palette.error,
    fontSize: 12,
    marginTop: '1rem',
    width: '100%'
  },
  submitButton: {
    marginTop: '1rem'
  },
  errorsList: {
    width: '100%',
    margin: 0,
    marginTop: '1rem',
    paddingLeft: '1rem',
    boxSizing: 'border-box'
  },
  errorItem: {
    fontSize: '0.75rem',
    color: theme.palette.error.main
  }
})

export default styles
