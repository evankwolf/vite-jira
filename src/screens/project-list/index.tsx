import React, { useEffect, useState } from "react"
import qs from "qs"
import List from "./list"
import SearchPanel from "./search-panel"
import { cleanObject } from "../../utils"
import { useDebounce } from "../../hooks"
import request from "../../utils/http"

const apiUrl = import.meta.env.VITE_APP_API_URL
const ProjectList = () => {
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  const [param, setParam] = useState({
    name: "",
    personId: "",
  })
  const debouncedParam = useDebounce(param, 500) // 使用防抖hooks

  // 每当param发生变化的时候，调用useEffect中的函数，fetch请求并且变动list
  useEffect(() => {
    const config = {
      data: cleanObject(debouncedParam),
    }
    request('/projects', config).then(async (res) => {
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [debouncedParam])

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  }, [])
  return (
    <div className="project-list-container">
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  )
}

export default ProjectList
