import qs from 'qs'
import * as auth from '../auth-provider'
import { useAuth } from '../context/auth-context'

const apiUrl = import.meta.env.VITE_APP_API_URL

interface Config extends RequestInit {
  token?: string | null | undefined,
  data?: object | undefined,
  headers?: HeadersInit
}
export const request = (endpoint:string, { data, token = '', headers, ...customConfig }: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : auth.getToken() || '',
      'Content-Type': data ? 'application/json' : '',
      ...headers,
    },
    ...customConfig,
  }

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }

  return fetch(`${apiUrl}${endpoint}`, config)
    .then(async res => {
      if (res.status === 401) {
        await auth.logout()
        window.location.reload() // 权限不足，重新加载页面
        return Promise.reject({ message: '请重新登录' })
      }

      const data = await res.json()
      if (res.ok) {
        return data
      } 
      return Promise.reject(data)
      
    })
}

export const useHttp = () => {
  const { user } = useAuth()
  return (...[endpoint, config]: Parameters<typeof request>) => request(endpoint, { ...config, token: user?.token })
}

export default request