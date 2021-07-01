const mongoose = require("mongoose");
const project = new mongoose.Schema({
  projectName: { type: String, unique: true },
  users: { type: Array },
  todos: [{
    content: String,
    completed: Boolean,
    addedBy:String
  }]
});

module.exports = mongoose.model("Project", project);