import React, { useState } from 'react'
import Login from './Components/Login/Login'
import Axios from 'axios'
import Projects from './Components/Projects/Projects'
import Project from './Components/Project/Project'
import {
  Switch,
  Route
} from "react-router-dom";
import NavBar from './Components/NavBar/NavBar'
export default function App() {
  const [authenticated, setauthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const checkAuthentication = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/isLoggedIn",
    }).then((res) => {
      console.log(res.data)
      if (!res.data) {
        setauthenticated(false)
      } else {
        setauthenticated(true)
        setUsername(res.data.username)
      }
    });
  }
  checkAuthentication()
  if (!authenticated) {
    return <div>
      <Login handleSubmit={setauthenticated} />
    </div>
  } else {
    return <div>
      <NavBar logout={setauthenticated} username={username} />
      <Switch>
        <Route path="/" exact>
          <Projects />
        </Route>
        <Route path="/project/:prjName">
          <Project />
        </Route>
        <Route path="/todo">
          <Projects />
        </Route>
      </Switch>
    </div>
  }
}
