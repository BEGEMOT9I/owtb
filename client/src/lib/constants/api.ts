// const DEV_DOMAIN = 'https://owtb.nineone.ru'
const DEV_DOMAIN = 'http://localhost:3000'
// const PROD_DOMAIN =
//   process.env.NODE_ENV === 'development'
//     ? 'https://owtb.nineone.ru'
//     : window.location.origin
const PROD_DOMAIN = 'http://localhost:3000'

export const DOMAIN = process.env.NODE_ENV === 'development' ? DEV_DOMAIN : PROD_DOMAIN

const DEV_API = `${DEV_DOMAIN}/api`
const PROD_API = `${PROD_DOMAIN}/api`

export const API_URL = `${process.env.NODE_ENV === 'development' ? DEV_DOMAIN : PROD_DOMAIN}/api`

export const METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
}
