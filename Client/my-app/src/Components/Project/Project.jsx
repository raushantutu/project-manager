import React, { useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import Todo from "../Todo/Todo";
export default function Project() {
  const [userList, setUserList] = useState([]);
  const [todo, setTodo] = useState([]);
  const [times, setTimes] = useState(0);
  const [newTodo, setNewTodo] = useState("");
  const [newUser, setnewUser] = useState("");
  const { prjName } = useParams();

  const addUser = () => {
    const str = "http://localhost:4000/projects/" + prjName + "/addUsers";
    const data = {
      users: [],
    };
    data.users.push(newUser);
    console.log(data);
    Axios({
      method: "POST",
      withCredentials: true,
      data: data,
      url: str,
    }).then((res) => {
      console.log(res.data, 1111);
      // window.location.reload(false);
      projRetrieve();
      setnewUser("");
    });
  };

  const sendTodo = () => {
    const str = "http://localhost:4000/projects/" + prjName + "/addTodos";
    const data = {
      content: newTodo,
    };
    Axios({
      method: "POST",
      withCredentials: true,
      data: data,
      url: str,
    }).then((res) => {
      console.log(res.data);
      // window.location.reload(false);
      projRetrieve();
      setNewTodo("");
    });
  };

  const removeUser = (e) => {
    console.log(e.target.value);
    const str = "http://localhost:4000/projects/"+prjName+"/deleteUsers"
    const data = {user:e.target.value}
    Axios({
      method: "POST",
      withCredentials: true,
      data: data,
      url: str,
    }).then((res) => {
      console.log(res.data, 1111);
      projRetrieve();
    });
  };

  const projRetrieve = () => {
    const str = "http://localhost:4000/projects/" + prjName;
    console.log(str);
    Axios({
      method: "GET",
      withCredentials: true,
      url: str,
    }).then((res) => {
      console.log(res.data, "1223123");
      const list = res.data.users.map((user) => {
        return (
          <li>
            {user}{" "}
            <button value={user} onClick={removeUser}>
              Remove user
            </button>
          </li>
        );
      });
      setUserList(list);
      setTodo(res.data.todos);
      console.log(res.data.todos);
    });
  };
  if (times === 0) {
    projRetrieve();
    setTimes(1);
  }
  return (
    <div>
      <h3>Team member for this project</h3>
      {userList}
      <input
        value={newUser}
        type="text"
        onChange={(e) => {
          setnewUser(e.target.value);
        }}
      />
      <button onClick={addUser}>Add User</button>
      <br />
      <h3>ToDos of the projects</h3>
      <Todo data={todo} dontReload={projRetrieve} />
      <input
        value={newTodo}
        type="text"
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
      />
      <button onClick={sendTodo}>Add Todo</button>
    </div>
  );
}
