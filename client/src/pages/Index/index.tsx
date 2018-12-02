import React, { PureComponent, Fragment } from 'react'
import { compose } from 'recompose'
import injectStyles, { JSSProps } from 'react-jss'
import { hot } from 'react-hot-loader'
import axios from 'axios'

import fetchAPI from 'lib/services/fetchAPI'
import AppHelmet from 'components/AppHelmet'
import Search, { OuterProps as SearchOuterProps } from 'components/Search'
import styles from './styles'

interface OuterProps extends App.RouteProps {}
interface Props extends OuterProps, JSSProps<typeof styles> {}
interface State {
  searchQuery: string
  foundPlayers: Data.PlayerGlobalSearched[]
}

class IndexPage extends PureComponent<Props, State> {
  lastRequest: NodeJS.Timer

  constructor(props) {
    super(props)

    this.state = {
      searchQuery: '',
      foundPlayers: []
    }
  }

  searchPlayers = async (value: string) => {
    const { data }: { data: Data.PlayerGlobalSearched[] } = await fetchAPI({
      endpoint: '/search',
      withoutVersion: true,
      params: {
        query: value
      }
    })

    this.setState({ foundPlayers: data })
  }

  onChange: SearchOuterProps['onChange'] = (event, { newValue }) => {
    this.setState({ searchQuery: newValue })
  }

  onSelected: SearchOuterProps['onSelected'] = (event, { suggestion }) => {
    this.setState({ searchQuery: suggestion.name })
  }

  onClear: SearchOuterProps['onClear'] = () => this.setState({ foundPlayers: [] })

  onFetchRequest: SearchOuterProps['onFetchRequest'] = ({ value, reason }) => {
    clearTimeout(this.lastRequest)

    this.lastRequest = setTimeout(() => this.searchPlayers(value), 250)
  }

  render() {
    const { classes } = this.props
    const { foundPlayers, searchQuery } = this.state

    return (
      <Fragment>
        <AppHelmet title="Главная" />
        <section className={classes.container}>
          <h1>Hell0</h1>
          <Search
            suggestions={foundPlayers}
            value={searchQuery}
            onChange={this.onChange}
            onSelected={this.onSelected}
            onClear={this.onClear}
            onFetchRequest={this.onFetchRequest}
          />
        </section>
      </Fragment>
    )
  }
}

export default compose<Props, OuterProps>(
  hot(module),
  injectStyles(styles)
)(IndexPage)
