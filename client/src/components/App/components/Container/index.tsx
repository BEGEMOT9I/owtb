import React from 'react'
import { ThemeProvider } from 'react-jss'

import AppRouter from '../Router'
import theme from 'lib/theme'

const Container = () => (
  <ThemeProvider theme={theme}>
    <AppRouter />
  </ThemeProvider>
)

export default Container
