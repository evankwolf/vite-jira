import React, { useState } from "react"
import { useAuth } from "../../context/auth-context"
import Login from "./login"
import Register from "./register"

const UnauthenticatedApp = () => {
  const [isRegister, setRegister] = useState(false)
  return (
    <div className="unauthenticated-app">
      {isRegister ? <Login /> : <Register />}
      <button type="button" onClick={() => setRegister(!isRegister)}>
        切换到{ isRegister ? '注册' : '登录' }
      </button>
    </div>
  )
}
export default UnauthenticatedApp