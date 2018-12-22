const styles = (theme: App.Theme) => ({
  errorMsg: {
    color: theme.palette.error.main,
    fontSize: '0.75rem',
    marginTop: '1rem',
    width: '100%',
    textAlign: 'center'
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
