import React from "react"
import type { User } from "./search-panel"

interface Project {
  id: 1;
  name: "骑手管理";
  personId: 1;
  organization: "外卖组";
  created: 1604989757139;
}

interface ListProps {
  list: Project[];
  users: User[];
}

const List = ({ list, users = [] }: ListProps) => (
  <table>
    <thead>
      <tr>
        <th>项目名称</th>
        <th>负责人</th>
      </tr>
    </thead>
    <tbody>
      {list.map((project) => (
        <tr key={Math.random() * 100000}>
          <td key={Math.random() * 100000}>{project.name}</td>
          <td key={Math.random() * 100000}>
            {users.find((user) => user.id === project.personId)?.name || "未知"}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default List
