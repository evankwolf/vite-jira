import React from 'react'

const List = ({list, users = []}) => (
  <table>
    <thead>
      <tr>
        <th>项目名称</th>
        <th>负责人</th>
      </tr>
    </thead>
    <tbody>
      {list.map(project => (
        <tr key={Math.random() * 100000}>
          <td key={Math.random() * 100000}>{project.name}</td>
          <td key={Math.random() * 100000}>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default List