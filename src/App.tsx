import React from 'react'
import AuthenticatedApp from './screens/authenticated-app'
import UnauthenticatedApp from './screens/unauthenticated-app'
// import LoginScreen from './screens/login'
// import ProjectList from './screens/project-list'
// import TryUseArray from './components/try-use-array'
// import {SearchPanel} from './screens/project-list/search-panel'
import './App.css'
import { useAuth } from './context/auth-context'
import { useMount } from './utils'

function App() {
  const { user } = useAuth()
  useMount(() => {

  })
  return (
    <div className="App">
      {/* <TryUseArray /> */}
      {/* <ProjectList /> */}
      {/* <LoginScreen /> */}
      { user ? <AuthenticatedApp /> : <UnauthenticatedApp /> }
    </div>
  )
}

export default App
