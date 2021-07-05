import React, { useState } from "react";
import Axios from "axios";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("")
  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:4000/login",
    }).then((res) => {
      console.log(res);
      setResponse(res.data)
      const checkAuthentication = () => {
        Axios({
          method: "GET",
          withCredentials: true,
          url: "http://localhost:4000/isLoggedIn",
        }).then((res) => {
          console.log(res.data);
          if (!res.data) {
            props.handleSubmit(false);
          } else {
            props.handleSubmit(true);
          }
        });
      };
      checkAuthentication();
    });
  };
  return (
    <div>
      <input
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Submit</button>
      <p style={{color:"red"}}>{response}</p>
    </div>
  );
}
