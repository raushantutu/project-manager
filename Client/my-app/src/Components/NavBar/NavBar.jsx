import React from "react";
import Axios from "axios";
export default function NavBar(props) {
//   const username = props.username;
  const logout = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/Logout",
    }).then((res) => {
      console.log(res.data);
      props.logout(false);
    });
  };
  return (
    <div>
        <pre>You are logged in as {props.username} </pre>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
