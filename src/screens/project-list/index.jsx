import React, { useEffect, useState } from 'react'
import qs from 'qs'
import List from './list'
import SearchPanel from './search-panel'
import {cleanObject} from '../../utils'

const apiUrl = import.meta.env.VITE_APP_API_URL
const ProjectList = () => {
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  
  // 每当param发生变化的时候，调用useEffect中的函数，fetch请求并且变动list
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`)
      .then(async res => {
        if (res.ok) {
          setList(await res.json())
        }
      })
  }, [param])

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  }, [])
  return (
    <div className='project-list-container'>
      <SearchPanel users={users} param={param} setParam={setParam}/>
      <List list={list} users={users}/>
    </div>
  )
}

export default ProjectList