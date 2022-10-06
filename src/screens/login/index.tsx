// import type { FormEvent } from 'react'
import React from 'react'
import { useAuth } from '../../context/auth-context'

const Login = () => {
  const { login, user } = useAuth()
  const apiUrl = import.meta.env.VITE_APP_API_URL
  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault() // 防止submit之后导致页面跳转
  //   const apiUrl = import.meta.env.VITE_APP_API_URL
  //   // 获取通过currentTarget API分别获取submit行为中的子元素
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement).value
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement).value
  //   const params = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ username, password }),
  //   }
  //   fetch(`${apiUrl}/login`, params).then(res => {
  //     if (res.ok) {
  //       console.log('成功登录!')
  //     }
  //   }).catch(err => {
  //     console.log('登录失败，原因是', err)
  //   })
  // }

  const _handleLogin = () => {
    const username = (document.querySelector('#username') as HTMLInputElement)!.value
    const password = (document.querySelector('#password') as HTMLInputElement)!.value
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }
    fetch(`${apiUrl}/login`, params).then(res => {
      if (res.ok) {
        console.log('成功登录!')
      }
    }).catch(err => {
      console.log('登录失败，原因是', err)
    })
  }

  const handleLogin = () => {
    const username = (document.querySelector('#username') as HTMLInputElement)!.value
    const password = (document.querySelector('#password') as HTMLInputElement)!.value
    login({ username, password })
  }

  const handleRegister = () => {
    const username = (document.querySelector('#username') as HTMLInputElement)!.value
    const password = (document.querySelector('#password') as HTMLInputElement)!.value
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }
    fetch(`${apiUrl}/register`, params).then(res => {
      if (res.ok) {
        console.log('成功注册!')
      }
    }).catch(err => {
      console.log('注册失败，原因是', err)
    })
  }

  const handleMismatch = () => {
    fetch(`${apiUrl}/nihao`).then(res => {
      console.log('/nihao', res)
    }).catch(err => {
      console.log('/nihao err', err)
    })
  }

  return (
    <form>
      {
        user && <div>登录成功，用户名： {user.name}</div>
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
        <button type="button" onClick={handleRegister}>注册</button>
        <button type="button" onClick={handleMismatch}>不存在的路径</button>
      </div>
    </form>
  )
}

export default Login