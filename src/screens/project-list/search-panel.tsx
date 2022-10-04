import React from "react"

export interface User {
  id: number;
  name: string;
}

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (params: SearchPanelProps["param"]) => void;
}

const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => (
  <form action="">
    <input
      type="text"
      value={param.name}
      onChange={(evt) =>
        setParam({
          ...param,
          name: evt.target.value,
        })
      }
    />
    <select
      id="selector"
      value={param.personId}
      onChange={(evt) =>
        setParam({
          ...param,
          personId: evt.target.value,
        })
      }
    >
      <option value="">全部</option>
      {users.map((user) => (
        <option value={user.id} key={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  </form>
)

export default SearchPanel
