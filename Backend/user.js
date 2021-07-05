const mongoose = require("mongoose");
const user = new mongoose.Schema({
  username: {type:String,unique:true},
  password: String,
  projects: Array
});

module.exports = mongoose.model("User", user);