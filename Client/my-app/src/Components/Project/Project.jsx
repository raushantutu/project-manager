import React, { useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import Todo from "../Todo/Todo";
export default function Project() {
  const [userList, setUserList] = useState([]);
  const [todo, setTodo] = useState([]);
  const [times, setTimes] = useState(0);
  const { prjName } = useParams();
  console.log(123);
  const projRetrieve = () => {
    const str = "http://localhost:4000/projects/" + prjName;
    console.log(str);
    Axios({
      method: "GET",
      withCredentials: true,
      url: str,
    }).then((res) => {
      console.log(res.data, "1223123");
      setUserList(res.data.users);
      setTodo(res.data.todos);
    });
  };
  if (times == 0) {
    projRetrieve();
    setTimes(1);
  }
  return (
    <div>
      {userList}
      <br />
      <Todo data={todo} />
    </div>
  );
}
