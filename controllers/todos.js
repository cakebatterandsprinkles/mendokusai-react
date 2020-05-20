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
    res.status(400).send(validationResult);
  }

  const { todo, status } = req.body;
  console.log(req.body);
  const newTodo = {};
  newTodo.user = req.user.id;
  if (todo) newTodo.todo = todo;
  if (status) newTodo.status = status;

  ToDo.findOne({
    user: req.user.id,
    _id: req.body._id,
  })
    .then((todo) => {
      if (todo) {
        todo.status = status;
      } else {
        todo = new ToDo(newTodo);
        console.log(todo);
      }
      todo.save().then((todo) => {
        res.json(todo);
      });
    })
    .catch((err) => {
      res.status(500).send(err.toString());
    });
};

exports.deleteTodo = (req, res, next) => {
  ToDo.findOneAndDelete({ user: req.user.id, _id: req.body.id })
    .then(() => res.status(200).end())
    .catch((err) => res.status(500).send(err));
};

exports.getToday = (req, res, next) => {
  ToDo.find({
    user: req.user.id,
    date: new Date().toISOString().substring(0, 10),
  })
    .then((todos) => res.json(todos))
    .catch((err) => res.status(500).send(err));
};
