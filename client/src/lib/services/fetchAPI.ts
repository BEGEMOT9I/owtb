import axios from 'axios'
import { API_URL, METHOD } from 'constants/api'

interface Headers {
  [header: string]: string
}

export interface FetchOptions {
  method?: string
  domain?: string
  endpoint: string
  path?: string
  token?: string
  body?: any
  version?: string
  withoutVersion?: boolean
  onUploadProgress?: (progressEvent: ProgressEvent) => any
  onDownloadProgress?: (progressEvent: ProgressEvent) => any
  params?: { [key: string]: any }
  headers?: { [key: string]: string }
}

function fetchAPI<T extends {}>({
  method = METHOD.GET,
  domain = API_URL,
  endpoint,
  path = '',
  token = '',
  body,
  params = {},
  headers = {},
  version = 'v1',
  withoutVersion = false,
  onUploadProgress,
  onDownloadProgress
}: FetchOptions) {
  const withVersion = domain === API_URL && !withoutVersion
  const url = `${domain}${withVersion ? `/${version}` : ''}${endpoint}${path ? `/${path}` : ''}`

  const reqHeaders: Headers = token ? { 'X-User-Token': `${token}`, ...headers } : { ...headers }

  if (process.env.NODE_ENV === 'development') {
    console.log('API CALL', method.toUpperCase(), url, reqHeaders, body)
  }

  return axios.request({
    url,
    method,
    data: body,
    headers: reqHeaders,
    params,
    onUploadProgress,
    onDownloadProgress
  })
}

export default fetchAPI
