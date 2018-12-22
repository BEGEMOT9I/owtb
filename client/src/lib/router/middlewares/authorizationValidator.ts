import { Router, State } from 'router5'

import userStore from 'src/lib/store/modules/user'
import { restrictedRoutes } from 'src/routes'

export default (router: Router) => async (toState: State, fromState: State) => {
  const redirectState = { redirect: { name: 'login' } }

  if (restrictedRoutes.includes(toState.name)) {
    try {
      if (!userStore.isAuthorized) {
        const persistedSession = userStore.getPersistedSession()

        if (persistedSession.access_token && persistedSession.refresh_token) {
          return await userStore.refreshSession(persistedSession.refresh_token)
        }

        throw new Error('Token is empty')
      }
    } catch (error) {
      return Promise.reject(redirectState)
    }
  }

  return Promise.resolve()
}
