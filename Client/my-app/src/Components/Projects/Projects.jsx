import React, { useState } from "react";
import Axios from "axios";
export default function Projects() {
  const [projectList, setProjectList] = useState([23, 34]);
  const [times, setTimes] = useState(0);

  const getProjList = async () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/projects",
    }).then((res) => {
      console.log(res.data, "data");
      const datatt = res.data;
      setProjectList((prev) => {
        var varArray = datatt.map((projectName)=>{return <li>{projectName}</li>});
        console.log(varArray, res.data);
        return varArray;
      });
      console.log(projectList, "projecList");
    });
  };
  if (times == 0) {
    getProjList();
    setTimes(1);
  }
  return (
    <div>
      <ul>{projectList}</ul>
    </div>
  );
}
