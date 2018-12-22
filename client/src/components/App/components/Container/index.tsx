import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blueGrey from '@material-ui/core/colors/blueGrey'

import AppRouter from '../Router'

const muiTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: 'Tahoma, Geneva, sans-serif'
  },
  palette: {
    primary: blueGrey
  }
})

const Container = () => (
  <MuiThemeProvider theme={muiTheme}>
    <AppRouter />
  </MuiThemeProvider>
)

export default Container
