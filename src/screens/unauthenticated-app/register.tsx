// import type { FormEvent } from 'react'
import React, { useState } from 'react'
import { useAuth } from '../../context/auth-context'

const Register = () => {
  const { register, user } = useAuth()
  const [registerRes, setResgisterRes] = useState(false)
  const handleRegister = () => {
    const username = (document.querySelector('#username') as HTMLInputElement)!.value
    const password = (document.querySelector('#password') as HTMLInputElement)!.value
    register({ username, password }).then(res => {
      if (res.code === 0) {
        setResgisterRes(true)
      } else {
        setResgisterRes(false)
      }
    })
  }

  return (
    <form>
      {
        registerRes && <div>注册成功!</div>
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
        <button type="button" onClick={handleRegister}>注册</button>
      </div>
    </form>
  )
}

export default Register