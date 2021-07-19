import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
export default function Projects(props) {
  const [projectList, setProjectList] = useState([23, 34]);
  const [times, setTimes] = useState(0);
  const [newProjectName, setNewProjectName] = useState("");
  const handleClick = () => {
    const data = {
      name: newProjectName,
    };
    Axios({
      method: "POST",
      data: data,
      withCredentials: true,
      url: "http://localhost:4000/projects",
    }).then((res) => {
      console.log(res.data);
      if (res.data === "Success") {
        getProjList();
        setNewProjectName("");
      }
    });
  };
  const handleDeleteProject = (e)=>{
    const str="http://localhost:4000/projects/"+e.target.value
    console.log(str);
    Axios({
      method: "DELETE",
      withCredentials: true,
      url: str,
    }).then((res)=>{
      console.log(res.data)
      getProjList();
    })
  }
  const getProjList = async () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/projects",
    }).then((res) => {
      console.log(res.data, "data");
      const datatt = res.data;
      setProjectList((prev) => {
        var varArray = datatt.map((projectName) => {
          const str = "/project/" + projectName;
          return (
            <li>
              <Link to={str}>{projectName} </Link>
              <button value={projectName} onClick={handleDeleteProject}>Delete</button>
            </li>
          );
        });
        console.log(varArray, res.data);
        return varArray;
      });
      console.log(projectList, "projecList");
    });
  };
  if (times === 0) {
    getProjList();
    setTimes(1);
  }
  return (
    <div>
      <h3>
        All of your projects: <br />
      </h3>
      <ul>{projectList}</ul>
      <input
        type="text"
        value={newProjectName}
        onChange={(e) => {
          setNewProjectName(e.target.value);
        }}
      />
      <button onClick={handleClick}>Add This Project</button>
    </div>
  );
}
