import React, { useState } from "react";
import Axios from "axios";
export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(false)
  const handleClick = () => {
    Axios({
        method: "POST",
        data: {
          username: username,
          password: password,
        },
        withCredentials: true,
        url: "http://localhost:4000/register",
      }).then((res) => {
          setResponse(res.data)
      })
  };
  return (
    <div>
      <input type="text" placeholder="username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
      <input type="password" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
      <button onClick={handleClick}>Submit</button>
      <p style={{color:"red"}}>{response}</p>
    </div>
  );
}
