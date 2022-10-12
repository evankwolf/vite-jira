import React, { useEffect, useState } from "react"
import qs from "qs"
import List from "./list"
import SearchPanel from "./search-panel"
import { cleanObject } from "../../utils"
import { useDebounce } from "../../hooks"
import { useHttp } from "../../utils/http"

const ProjectList = () => {
  const http = useHttp()
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
    http('/projects', config).then((res) => {
      setList(res)
    })
  }, [debouncedParam])

  useEffect(() => {
    http('/users').then((res) => {
      setUsers(res)
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
