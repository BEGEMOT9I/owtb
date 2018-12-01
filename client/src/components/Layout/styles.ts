const styles = (theme: App.Theme) => ({
  '@global': {
    html: {
      fontSize: 16,
      fontStyle: 'normal',
      width: '100%',
      minHeight: '100%'
    },
    'body, #root': {
      width: '100%',
      minHeight: '100%'
    },
    body: {
      margin: 0
    },
    '#root': {
      width: '100%'
    }
  },
  layout: {
    width: '100%',
    height: '100%',
    margin: '0',
    padding: '0'
  }
})

export { styles as default }
