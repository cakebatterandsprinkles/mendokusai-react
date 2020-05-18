const ToDo = require("../models/ToDo");

validateTodo = (todo) => {
  if (todo === "") {
    return "To do's should not be empty. C'mon, you know better!";
  }
  return "Success";
};

exports.postToday = (req, res, next) => {
  const validationResult = validateTodo(req.todo);
  if (validationResult !== "Success") {
    return validationResult;
  }

  const { todo, status } = req.body;
  const newTodo = {};
  newTodo.user = req.user.id;
  if (todo) newTodo.todo = todo;
  if (status) newTodo.status = status;
};

exports.getToday = (req, res, next) => {};
