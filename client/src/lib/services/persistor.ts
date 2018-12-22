import Cookie from 'js-cookie'

class Persistor {
  prefix = 'owtb_'

  setCookie = (name: string, value: any, options: { [key: string]: any }) => {
    Cookie.set(`${this.prefix}${name}`, value, options)
  }

  getCookie = (name: string) => {
    return Cookie.get(`${this.prefix}${name}`)
  }
}

export default new Persistor()
