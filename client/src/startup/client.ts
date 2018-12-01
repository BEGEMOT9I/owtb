import './registerSW'

import ReactOnRails from 'react-on-rails'

import ClientApp from 'components/App/index.client'

ReactOnRails.register({
  App: ClientApp
})
