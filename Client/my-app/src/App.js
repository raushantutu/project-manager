import React, { useState } from 'react'
import Login from './Components/Login/Login'
import Axios from 'axios'
import Projects from './Components/Projects/Projects'
import Project from './Components/Project/Project'
import SignUp from './Components/SignUp/SignUp'
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
      <h3>Login:</h3>
      <Login handleSubmit={setauthenticated} />
      <h3>Sign up:  </h3>
      <SignUp />
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
      </Switch>
    </div>
  }
}
