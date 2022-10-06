// import type { FormEvent } from 'react'
import React, { useState } from 'react'
import { useAuth } from '../../context/auth-context'

const Login = () => {
  const { login, user } = useAuth()
  const [loginErr, setErr] = useState(false)

  // 下面是使用了useAuth之后的注册方法，原来的注册方法放在了/src/login里面
  const handleLogin = () => {
    const username = (document.querySelector('#username') as HTMLInputElement)!.value
    const password = (document.querySelector('#password') as HTMLInputElement)!.value
    login({ username, password }).then(res => {
      if (!res?.token) {
        setErr(true)
      } else {
        setErr(false)
      }
    })
  }

  return (
    <form>
      {
        loginErr && <div>登录失败！请重新检查用户名与密码</div>
      }
      <div>
        <label htmlFor='username'>用户名
          <input id='username' type="text" />
        </label>
        
      </div>
      <div>
        <label htmlFor="password">密码
          <input id='password' type="password" />
        </label>
      </div>
      <div>
        <button type="button" onClick={handleLogin}>登录</button>
      </div>
    </form>
  )
}

export default Login