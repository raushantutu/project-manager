const mongoose = require("mongoose");
const project = new mongoose.Schema({
  projectName:{type:String,unique:true},
  users:{type:Array}
});

module.exports = mongoose.model("Project", project);