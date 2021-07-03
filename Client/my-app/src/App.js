import React, { useState } from 'react'
import Login from './Components/Login/Login'
import Axios from 'axios'
import Projects from './Components/Projects/Projects'
export default function App() {
  const [authenticated, setauthenticated] = useState(false)
  const checkAuthentication = ()=>{
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/isLoggedIn",
    }).then((res) => {
      console.log(res.data)
      if(!res.data){
        setauthenticated(false)
      }else{
        setauthenticated(true)
      }
    });
  }
  checkAuthentication()
  if (!authenticated) {
    return <div>
      <Login handleSubmit={setauthenticated} />
    </div>
  } else {
    return <div><Projects /></div>
  }
}
