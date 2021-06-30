const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const passport = require("passport")
const passportLocal = require("passport-local")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcryptjs")
const session = require("express-session")
const app = express()
const User = require("./user");
const Project = require("./project");
//---------END OF IMPORTS-------------------------------------------------
mongoose.connect(
    "mongodb://localhost:27017/TestDB",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log("Mongoose Is Connected");
    }
)

//-----------Middleware---------------------------------------------------
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
)
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
)
app.use(cookieParser("secretcode"))
app.use(passport.initialize())
app.use(passport.session())
require("./passportConfig")(passport);

//-------------END OF MIDDLEWARE------------------------------------------

//------------------ROUTES------------------------------------------------

app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        console.log(user)
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
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
    console.log(req.isAuthenticated())
    console.log(req.user);
});
app.get("/logout", function (req, res) {
    req.logout();
    res.send("Successfully Logged out")
})

app.post("/projects", async function (req, res) {
    if (req.isAuthenticated()) {
        const newProject = new Project({
            projectName: req.body.name,
            users: [req.user.username]
        })
        await newProject.save()
        User.findByIdAndUpdate(req.user.id, { $push: { projects: req.body.name } }, function (err, doc) {
            if (err) { throw err } else { console.log(doc) }
        })
        res.send("Success")
    } else {
        res.send("Please Log In")
    }
})

app.get("/projects/:prjNm", function (req, res) {
    const projName = req.params.prjNm
    console.log(projName)
    if (req.isAuthenticated()) {
        console.log(projName)
        Project.findOne({ projectName: projName }, function (err, doc) {
            if (err) {
                console.log(err)
            }
            else if (!doc) {
                res.send("Project does not exist")
            }
            else {
                console.log(doc.users)
                if (doc.users.includes(req.user.username)) {
                    res.send(doc);
                } else {
                    res.send("You don't have the access to this project")
                }
            }
        })
    }
    else {
        res.send("Please Log In")
    }
})

//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server
app.listen(4000, function () {
    console.log("Server started on port 3000.")
});
