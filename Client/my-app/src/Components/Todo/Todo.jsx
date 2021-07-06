import React from "react";
import Axios from "axios";
import { useParams } from "react-router";

export default function Todo(props) {
  const { prjName } = useParams();
  const handleClick = (e) => {
    const str =
      "http://localhost:4000/projects/" + prjName + "/todo/" + e.target.value;
    // console.log(str)
    Axios({
      method: "GET",
      withCredentials: true,
      url: str,
    }).then((res) => {
      console.log(res.data);
      props.dontReload();
    });
  };
  const handleDelete = (e) => {
    const str =
      "http://localhost:4000/projects/" + prjName + "/todo/" + e.target.value;
    Axios({
      method: "DELETE",
      withCredentials: true,
      url: str,
    }).then((res) => {
      console.log(res.data);
      props.dontReload();
    });
  };
  // console.log(props.data);
  const listItems = props.data.map((indItem) => {
    return (
      <li>
        <button
          value={indItem.content}
          style={{
            textDecorationLine: indItem.completed ? "line-through" : "none",
            textDecorationStyle: "solid",
          }}
          onClick={handleClick}
        >
          {indItem.content}
        </button>
        <button value={indItem.content} onClick={handleDelete}>Delete</button>
      </li>
    );
  });
  return (
    <div>
      <ul>{listItems}</ul>
    </div>
  );
}
