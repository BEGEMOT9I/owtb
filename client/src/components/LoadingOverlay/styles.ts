const styles = (theme: App.Theme) => ({
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    position: 'absolute',
    borderRadius: 'inherit',
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    flex: '2 0 100%',
    zIndex: 888
  },
  loading: {
    zIndex: 889
  }
})

export default styles
