/// <reference types="webpack-env" />

import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader'
import { RailsContext } from 'react-on-rails'
import { Provider } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import { RouterProvider } from 'react-router5'

import stores from 'lib/store'
import router from 'lib/store/plugins/router'
import Container from './components/Container'

interface Props {
  isSSR: boolean
}

interface Context extends RailsContext {
  location: string
  serverSide: boolean
}

const renderApp = (
  props: Props,
  railsContext: RailsContext,
  Component: React.ComponentType,
  DOMElement: HTMLElement
) => {
  const component = (
    <Provider {...stores}>
      <Fragment>
        {process.env.NODE_ENV === 'development' && <DevTools />}
        <RouterProvider router={router}>
          <Component />
        </RouterProvider>
      </Fragment>
    </Provider>
  )

  router.start(railsContext.pathname, (err, state) => {
    render(component, DOMElement)
  })

  return component
}

const ClientApp = (props: Props, railsContext: Context, DOMNodeID: string) => {
  const rootElement = document.getElementById(DOMNodeID)

  try {
    const component = renderApp(props, railsContext, Container, rootElement)

    return hot(module)(component)
  } catch (error) {
    const component = render(
      <h1>
        Unpredictable error. Please, <a href={window.location.href}>click</a> to reload the page.
      </h1>,
      rootElement
    )

    router.stop()

    console.warn(error)

    return component
  }
}

export default ClientApp
