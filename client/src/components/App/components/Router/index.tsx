import React, { Component } from 'react'
import { constants } from 'router5'
import { RouterStore } from 'mobx-router5'
import { routeNode } from 'react-mobx-router5'

import { getRouteComponent, routes } from 'src/routes'
import Layout from 'components/Layout'

interface StateProps {
  routerStore: RouterStore
}
interface Props extends StateProps {}
interface State {}

class AppRouter extends Component<Props, State> {
  componentDidMount() {
    const { route } = this.props.routerStore

    getRouteComponent(route ? route.name : constants.UNKNOWN_ROUTE).preload()
  }

  render() {
    const { route, previousRoute } = this.props.routerStore

    const CurrentRoute = getRouteComponent(route ? route.name : constants.UNKNOWN_ROUTE)

    return (
      <Layout>
        <CurrentRoute route={route} previousRoute={previousRoute} />
      </Layout>
    )
  }
}

export default routeNode('')(AppRouter)
