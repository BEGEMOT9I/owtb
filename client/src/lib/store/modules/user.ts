import { observable, action, computed, runInAction } from 'mobx'
import { AxiosError } from 'axios'

import fetchAPI from 'lib/services/fetchAPI'
import Persistor from 'lib/services/persistor'
import RouterStore from './router'
import { ENDPOINT, METHOD, STATES } from 'constants/api'

export class UserStore {
  @observable isAuthorized = false
  @observable
  requests = {
    authorization: {
      state: STATES.IDLE,
      errors: {} as {
        global?: string
        [key: string]: string
      }
    },
    registration: {
      state: STATES.IDLE,
      errors: {} as {
        global?: string
        [key: string]: string
      }
    }
  }
  @observable
  profile = {} as {
    id?: number
    email?: string
    created_at?: number
  }
  @observable
  session = {} as {
    access_token?: string
    refresh_token?: string
    expired_at?: number
  }

  @action.bound
  persistSession({
    access_token,
    refresh_token,
    expired_at
  }: {
    access_token: string
    refresh_token: string
    expired_at: number
  }) {
    const expires = expired_at * 1000 - new Date().getTime()

    Persistor.setCookie('access_token', access_token, { expires })
    Persistor.setCookie('refresh_token', refresh_token, { expires })
  }

  @action.bound
  async refreshSession(refresh_token: string) {
    try {
      const {
        data: { profile, session }
      }: {
        data: {
          profile: {
            id: number
            email: string
            created_at: number
          }
          session: {
            access_token: string
            refresh_token: string
            expired_at: number
          }
        }
      } = await fetchAPI({
        endpoint: ENDPOINT.SESSION,
        method: METHOD.PUT,
        body: {
          refresh_token
        }
      })

      this.persistSession(session)

      runInAction(() => {
        this.profile = profile
        this.session = session
        this.isAuthorized = true
      })
    } catch (exception) {
      let error = 'Неизвестная проблема обновления токена'

      if (exception.response) {
        switch ((exception as AxiosError).response.data.error) {
          case 'Forbidden':
            error = (exception as AxiosError).response.data.error
            break
        }
      } else {
        error = exception
      }

      runInAction(() => {
        this.profile = {}
        this.session = {}
      })

      throw new Error(error)
    }
  }

  @action.bound
  getPersistedSession() {
    return {
      access_token: Persistor.getCookie('access_token'),
      refresh_token: Persistor.getCookie('refresh_token')
    }
  }

  @action.bound
  async login(email: string, password: string) {
    try {
      this.requests.authorization = {
        state: STATES.LOADING,
        errors: {}
      }

      const {
        data: { profile, session }
      }: {
        data: {
          profile: {
            id: number
            email: string
            created_at: number
          }
          session: {
            access_token: string
            refresh_token: string
            expired_at: number
          }
        }
      } = await fetchAPI({
        endpoint: ENDPOINT.SESSION,
        method: METHOD.POST,
        body: {
          session: {
            email,
            password
          }
        }
      })

      this.persistSession(session)

      runInAction(() => {
        this.profile = profile
        this.session = session
        this.isAuthorized = true
        this.requests.authorization = {
          state: STATES.LOADED,
          errors: {}
        }

        RouterStore.navigate('index')
      })
    } catch (exception) {
      const errors: UserStore['requests']['authorization']['errors'] = {}

      if (exception.response) {
        switch ((exception as AxiosError).response.data.error) {
          case 'Forbidden':
            errors.global = 'Неправильный логин или пароль'
            break
        }
      } else {
        errors.global = 'Что-то пошло не так. Повторите попытку позже'
      }

      runInAction(() => {
        this.requests.authorization = {
          state: STATES.FAILED,
          errors
        }
      })
    }
  }

  @action.bound
  async registration(email: string, password: string) {
    try {
      this.requests.registration = {
        state: STATES.LOADING,
        errors: {}
      }

      const { data } = await fetchAPI({
        endpoint: ENDPOINT.PROFILE,
        method: METHOD.POST,
        body: {
          profile: {
            email,
            password
          }
        }
      })

      console.log(data)

      runInAction(() => {
        this.requests.registration = {
          state: STATES.LOADED,
          errors: {}
        }
      })
    } catch (exception) {
      let errors: UserStore['requests']['registration']['errors'] = {}

      if (exception.response && (exception as AxiosError).response.data.errors) {
        const responseErrors = (exception as AxiosError).response.data.errors
        const fields = {
          password: 'Пароль',
          email: 'Email'
        }

        errors = Object.keys(responseErrors).reduce((result, errorFieldName) => {
          result[errorFieldName] = `${fields[errorFieldName]}: ${responseErrors[errorFieldName]}`

          return result
        }, {})
      } else {
        errors.global = 'Что-то пошло не так. Повторите попытку позже'
      }

      runInAction(() => {
        this.requests.registration = {
          state: STATES.FAILED,
          errors
        }
      })
    }
  }

  @computed
  get isAuthorizationSubmitting() {
    return this.requests.authorization.state === STATES.LOADING
  }

  @computed
  get isRegistrationSubmitting() {
    return this.requests.registration.state === STATES.LOADING
  }
}

export default new UserStore()
