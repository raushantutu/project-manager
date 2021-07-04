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
    });
    window.location.reload(false);
  };
  console.log(props.data);
  const listItems = props.data.map((indItem) => {
    if (!indItem.completed) {
      return (
        <li>
          <button value={indItem.content} onClick={handleClick}>
            {indItem.content}
          </button>
        </li>
      );
    } else {
      return (
        <li>
          <button
            style={{
              textDecorationLine: "line-through",
              textDecorationStyle: "solid",
            }}
            value={indItem.content}
            onClick={handleClick}
          >
            {indItem.content}
          </button>
        </li>
      );
    }
  });
  return (
    <div>
      <ul>{listItems}</ul>
    </div>
  );
}
