import type { ReactNode } from "react"
import React, { useState } from "react"
import * as auth from '../auth-provider'
import type { User } from "../screens/project-list/search-panel"
import { useMount } from "../utils"
import http from '../utils/http'

interface AuthForm {
  username: string
  password: string
}

const initUser = async () => {
  let user = null
  const token = auth.getToken()
  const config = { token: `${token}`, method: 'POST' }
  if (token) {
    const res = await http('/me', config)
    user = res.data
  }
  return user
}

const AuthContext = React.createContext<{
  user: User | null,
  login: (form: AuthForm) => Promise<User | null>,
  register: (form: AuthForm) => Promise<{code: number}>,
  logout: () => Promise<void>,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null)
  const login = (form: AuthForm) => auth.login(form).then(user => {
    setUser(user); return user
  })
  const register = (form: AuthForm) => auth.register(form).then(res => res)
  const logout = () => auth.logout().then(() => setUser(null))
  useMount(() => {
    initUser().then(setUser)
  })
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <AuthContext.Provider children={children} value={{ user, login, register, logout, setUser }} />
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}