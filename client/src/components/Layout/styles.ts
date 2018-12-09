const styles = (theme: App.Theme) => ({
  '@global': {
    html: {
      fontSize: 16,
      fontStyle: 'normal',
      width: '100%'
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      margin: 0
    },
    '#root': {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      width: '100%',
      font: {
        family: 'Circe',
        size: 15
      },
      zIndex: 1,
      boxSizing: 'border-box',
      transition: 'padding 0.3s ease-out',
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale'
    },
    'html, body': {
      height: '100%'
    }
  },
  layout: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.colors.background
  },
  '@global .visuallyHidden': {
    position: 'absolute',
    width: '1px',
    height: '1px',
    margin: '-1px',
    padding: 0,
    whiteSpace: 'nowrap',
    border: 0,
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)'
  }
})

export { styles as default }
