import React from "react";

export default function Todo(props) {
  console.log(props.data);
  const listItems = props.data.map((indItem) => {
    if (!indItem.completed) {
      return <li>{indItem.content}</li>;
    } else {
      return (
        <li>
          <s>{indItem.content}</s>
        </li>
      );
    }
  });
  return <ul>{listItems}</ul>;
}
