/* #region  Imports */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const app = express();
const User = require("./user");
const Project = require("./project");
/* #endregion */
/* #region  Middlewares */
mongoose.connect(
  "mongodb://localhost:27017/TestDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose Is Connected");
  }
);

//-----------Middleware---------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//-------------END OF MIDDLEWARE------------------------------------------

/* #endregion */
/* #region  Basic authentication routes */

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log(user);
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        // console.log(req.user);
      });
    }
  })(req, res, next);
});
app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});
app.get("/user", (req, res) => {
  if (!req.user) {
    res.send("No one is logged in!");
  } else {
    res.send(req.user);
  } // The req.user stores the entire user that has been authenticated inside of it.
  console.log(req.isAuthenticated());
  console.log(req.user);
});
app.get("/logout", function (req, res) {
  req.logout();
  res.send("Successfully Logged out");
});

/* #endregion */

app.post("/projects", async function (req, res) {
  if (req.isAuthenticated()) {
    const newProject = new Project({
      projectName: req.body.name,
      users: [req.user.username],
      todos: [],
    });
    await newProject.save();
    User.findByIdAndUpdate(
      req.user.id,
      { $push: { projects: req.body.name } },
      function (err, doc) {
        if (err) {
          throw err;
        } else {
          console.log(doc);
        }
      }
    );
    res.send("Success");
  } else {
    res.send("Please Log In");
  }
});

app.delete("/:username", function (req, res) {
  if (req.isAuthenticated() && req.user.username === req.params.username) {
    User.findOneAndDelete({ username: req.params.username }, (err, doc) => {
      if (err) {
        throw err;
      } else if (!doc) {
        res.send("User deleted suxxessfuly!!!");
      } else {
        doc.projects.forEach((project) => {
          Project.findOne({ projectName: project }, (err, docProj) => {
            if (err) {
              throw err;
            } else if (
              docProj.users.length === 1 &&
              docProj.users[0] === req.params.username
            ) {
              docProj.remove();
            } else if (docProj) {
              docProj.users = docProj.users.filter((userNme) => {
                return req.params.username != userNme;
              });
              docProj.save();
            }
          });
        });
        req.logout();
        res.send("successfuly deleted the user");
      }
    });
  }
});

app.get("/projects", function (req, res) {
  User.findOne({ username: req.user.username }, (err, doc) => {
    if (err) {
      throw err;
    } else if (!doc) {
      res.send("username doesn't exist");
    } else {
      res.send(doc.projects);
    }
  });
});

app.post("/projects/:prjNm/addUsers", function (req, res) {
  if (req.isAuthenticated()) {
    Project.findOne({ projectName: req.params.prjNm }, function (err, docProj) {
      if (err) {
        throw err;
      } else if (docProj) {
        if (docProj.users.includes(req.user.username)) {
          req.body.users.forEach((user) => {
            User.findOne({ username: user }, function (err, doc) {
              if (err) {
                throw err;
              } else if (!doc) {
                console.log(user + " is not a valid user/username");
              } else if (!doc.projects.includes(req.params.prjNm)) {
                doc.projects.push(req.params.prjNm);
                doc.save();
                if (!docProj.users.includes(user)) {
                  docProj.users.push(user);
                  docProj.save();
                }
              }
            });
          });
        } else {
          res.send(
            "You can't add users to this project as you are not part of the project"
          );
        }
      } else {
        res.send("No such project exists");
      }
    });
    res.send("something");
  } else {
    res.send("Please Log In");
  }
});

app.post("/projects/:prjNm/deleteUsers", function (req, res) {
  var sent = new Boolean(false);
  if (req.isAuthenticated()) {
    Project.findOne({ projectName: req.params.prjNm }, function (err, doc) {
      if (err) {
        throw err;
      } else if (!doc) {
        res.send("No project exists with this name");
      } else if (!doc.users.includes(req.user.username)) {
        res.send("Denied");
      } else {
        if (doc.users.length == 1) {
          res.send(
            "Can't delete user. Delete the project instead as their is only one user in the project"
          );
        } else {
          doc.users = doc.users.filter((username) => {
            return username != req.body.user;
          });
          User.findOne({ username: req.body.user }, function (err, docUser) {
            if (err) {
              throw err;
            } else if (!docUser) {
              res.send("User doesn't exist");
            } else {
              docUser.projects = docUser.projects.filter((project) => {
                return project != req.params.prjNm;
              });
              doc.save();
              docUser.save();
              res.send("Successfuly deleted user from the project");
            }
          });
        }
      } //NO more res.send() without checking sent
    });
  }
});

app.post("/projects/:prjNm/addToDos", function (req, res) {
  if (req.isAuthenticated()) {
    Project.findOne({ projectName: req.params.prjNm }, function (err, doc) {
      if (err) {
        throw err;
      } else if (doc) {
        if (doc.users.includes(req.user.username)) {
          var todo = {
            content: req.body.content,
            completed: false,
            addedBy: req.user.username,
          };
          doc.todos.push(todo);
          doc.save();
          res.send("ToDo successfully added");
        } else {
          res.send("You are not part of the project");
        }
      } else {
        res.send("No such project is available");
      }
    });
  } else {
    res.send("Please Log In");
  }
});

app.get("/projects/:prjNm/toDo/:todoName", function (req, res) {
  if (req.isAuthenticated()) {
    Project.findOne({ projectName: req.params.prjNm }, function (err, doc) {
      if (err) {
        throw err;
      } else if (doc) {
        if (doc.users.includes(req.user.username)) {
          doc.todos.forEach((edit) => {
            if (edit.content === req.params.todoName) {
              edit.completed = !edit.completed;
              console.log(edit);
              doc.save();
            }
          });
          res.send("ToDo successfully edited");
        } else {
          res.send("You are not part of the project");
        }
      } else {
        res.send("No such project is available");
      }
    });
  } else {
    res.send("Please Log In");
  }
});

app.delete("/projects/:prjNm/toDo/:todoName", function (req, res) {
  if (req.isAuthenticated()) {
    Project.findOne({ projectName: req.params.prjNm }, function (err, doc) {
      if (err) {
        throw err;
      } else if (doc) {
        if (doc.users.includes(req.user.username)) {
          doc.todos = doc.todos.filter((value, index, arr) => {
            return value.content != req.params.todoName;
          });
          doc.save();
          res.send("ToDo deleted successfuly");
        } else {
          res.send("You are not part of the project");
        }
      } else {
        res.send("No such project is available");
      }
    });
  } else {
    res.send("Please Log In");
  }
});

app.delete("/projects/:prjNm", function (req, res) {
  if (req.isAuthenticated()) {
    Project.findOne({ projectName: req.params.prjNm }, function (err, doc) {
      if (doc.users.includes(req.user.username)) {
        Project.findOneAndDelete(
          { projectName: req.params.prjNm },
          function (err, doc) {
            if (err) {
              throw err;
            } else if (!doc) {
              res.send("Project doesn't exist");
            } else {
              doc.users.forEach((username) => {
                User.findOne({ username: username }, function (err, doc) {
                  if (err) {
                    throw err;
                  } else if (!doc) {
                    console.log("User doesnt exist");
                  } else {
                    doc.projects = doc.projects.filter((proj) => {
                      console.log(req.params.prjNm === proj);
                      return req.params.prjNm != proj;
                    });
                    doc.save();
                  }
                });
              });
              res.send("Project has been deleted successfuly");
            }
          }
        );
      }
    });
  }
});

app.get("/projects/:prjNm", function (req, res) {
  const projName = req.params.prjNm;
  console.log(projName);
  if (req.isAuthenticated()) {
    console.log(projName);
    Project.findOne({ projectName: projName }, function (err, doc) {
      if (err) {
        console.log(err);
      } else if (!doc) {
        res.send("Project does not exist");
      } else {
        console.log(doc.users);
        if (doc.users.includes(req.user.username)) {
          res.send(doc);
        } else {
          res.send("You don't have the access to this project");
        }
      }
    });
  } else {
    res.send("Please Log In");
  }
});

app.get("/isLoggedIn", function (req, res) {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.send("0");
  }
});

//Start Server
app.listen(4000, function () {
  console.log("Server started on port 3000.");
});
