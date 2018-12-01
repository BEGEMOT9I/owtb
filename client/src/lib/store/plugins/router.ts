import { createRouter } from 'router5'
import loggerPlugin from 'router5/plugins/logger'
import browserPlugin from 'router5/plugins/browser'
import { mobxPlugin } from 'mobx-router5'

import routerStore from 'src/lib/store/modules/router'
import { routes } from '../../../routes'

const router = createRouter(routes, { allowNotFound: true })
  .usePlugin(mobxPlugin(routerStore))
  .usePlugin(browserPlugin())

if (process.env.NODE_ENV === 'development') {
  router.usePlugin(loggerPlugin)
}

export default router
