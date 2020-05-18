const mongoose = require("mongoose");
const ToDoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  todo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "not done",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ToDo = mongoose.model("todo", ToDoSchema);
