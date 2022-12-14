import type { User } from "./screens/project-list/search-panel"

const TOKEN_KEY = '__auth_provider_token__'
const apiUrl = import.meta.env.VITE_APP_API_URL
const getToken = (): (string | null) => localStorage.getItem(TOKEN_KEY)

const handleUserResponse = ({ data: user }: {data: User}) => {
  localStorage.setItem(TOKEN_KEY, user.token || '')
  return user
}

const login = (data: {username: string, password: string}) => {
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  return fetch(`${apiUrl}/login`, params).then(async res => {
    if (res.ok) {
      return handleUserResponse(await res.json())
    } 
    // eslint-disable-next-line prefer-promise-reject-errors
    return null
  })
}

const register = (data: {username: string, password: string}) => {
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  return fetch(`${apiUrl}/register`, params).then( async res => {
    if (res.ok) {
      console.log('成功注册!')
      // const data: User = await res.json()
      return { code: 0 }
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return { code: -1 }
  })
}

const logout = async () => {
  localStorage.removeItem(TOKEN_KEY)
  return true
  // const params = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // }
  // return fetch(`${apiUrl}/logout`, params).then(async res => {
  //   if (res.ok) {
  //     console.log('成功登出!')
  //     handleUserResponse(await res.json())
  //   }
  // }).catch(err => {
  //   console.log('登出失败，原因是', err)
  // })
}

export {
  getToken,
  handleUserResponse,
  login,
  register,
  logout,
}