import { observable, action, runInAction } from 'mobx'
import { AxiosError } from 'axios'

import fetchAPI from 'lib/services/fetchAPI'
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

  @action.bound
  async authorize(email: string, password: string) {
    try {
      this.requests.authorization = {
        state: STATES.LOADING,
        errors: {}
      }

      const { data } = await fetchAPI({
        endpoint: ENDPOINT.SESSION,
        method: METHOD.POST,
        body: {
          session: {
            email,
            password
          }
        }
      })

      console.log(data)

      runInAction(() => {
        this.requests.authorization = {
          state: STATES.LOADED,
          errors: {}
        }
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
          state: STATES.LOADED,
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
        endpoint: ENDPOINT.SESSION,
        method: METHOD.POST,
        body: {
          session: {
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
      const errors: UserStore['requests']['registration']['errors'] = {}

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
        this.requests.registration = {
          state: STATES.LOADED,
          errors
        }
      })
    }
  }
}

export default new UserStore()
