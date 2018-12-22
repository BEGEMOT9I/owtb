const styles = (theme: App.Theme) => ({
  container: {
    position: 'relative',
    width: '20rem',
    backgroundColor: '#FFFFFF',
    zIndex: 800,
    overflow: 'visible'
  },
  containerOpen: {},
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box'
  },
  searchIcon: {
    flex: '0 0 auto',
    width: '0.875rem',
    height: '0.875rem',
    marginRight: '0.5rem',
    fill: '#B8B8B8',
    stroke: '#B8B8B8'
  },
  cancelIcon: {
    flex: '0 0 auto',
    width: '0.875rem',
    height: '0.875rem',
    padding: '0.1rem',
    marginLeft: '0.5rem',
    backgroundColor: theme.palette.text.secondary,
    borderRadius: '50%',
    boxSizing: 'border-box',
    cursor: 'pointer',
    fill: '#FFFFFF',
    stroke: '#FFFFFF'
  },
  input: {
    flex: '1 0 auto',
    padding: '0.5rem',
    fontFamily: 'Helvetica',
    fontSize: '0.875rem',
    fontStyle: 'normal',
    color: '#000000',
    border: '1px solid #EBEBEB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    boxShadow: 'none',
    outline: 'none',
    '&::placeholder': {
      fontFamily: 'Helvetica',
      fontSize: '0.875rem',
      fontStyle: 'normal',
      color: theme.palette.text.secondary
    }
  },
  inputOpen: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 'calc(2.125rem - 1px)',
    maxHeight: 'calc(50vh - 1.5rem)',
    width: '100%',
    overflow: 'auto'
  },
  suggestionsContainerOpen: {
    border: `1px solid #EBEBEB`,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    boxSizing: 'border-box'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyle: 'none'
  },
  suggestion: {
    width: '100%',
    padding: '0.25rem 0.5rem',
    fontFamily: 'Helvetica',
    fontSize: '0.75rem',
    fontStyle: 'normal',
    color: '#000000',
    borderBottom: '1px solid #000000',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: 'rgba(47, 97, 213, 0.15)'
    },
    '&:last-child': {
      borderBottom: 'none'
    }
  }
})

export default styles
