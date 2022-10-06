import React from "react"
import { useAuth } from "../../context/auth-context"
import ProjectList from "../project-list"

const AuthenticatedApp = () => {
  const { user, logout } = useAuth()
  return (
    <div className="authenticated-app">
      <div>{ user ? `Hello! ${user.name}` : '' }</div>
      <button type="button" onClick={() => logout}>登出</button>
      <ProjectList />
    </div>
  )
}
export default AuthenticatedApp