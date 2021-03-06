const ToDo = require("../models/ToDo");
const BucketList = require("../models/BucketList");
const { setDate } = require("../util/date");

validateTodo = (todo) => {
  if (todo === "") {
    return "To do's should not be empty. C'mon, you know better!";
  }
  return "Success";
};

isValid = (req) => {
  const validationResult = validateTodo(req.todo);
  if (validationResult !== "Success") {
    return res.status(400).send(validationResult);
  }
};

exports.postToday = (req, res, next) => {
  isValid(req);

  const { todo, status, date } = req.body;
  const newTodo = {};
  newTodo.user = req.user.id;
  if (todo) newTodo.todo = todo;
  if (status) newTodo.status = status;
  if (date) newTodo.date = date;

  ToDo.findOne({
    user: req.user.id,
    _id: req.body._id,
  })
    .then((todo) => {
      if (todo) {
        todo.status = status;
      } else {
        todo = new ToDo(newTodo);
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
    date: req.query.date,
  })
    .then((todos) => res.json(todos))
    .catch((err) => res.status(500).send(err));
};

exports.getBucketlist = (req, res, next) => {
  BucketList.find({
    user: req.user.id,
  })
    .then((items) => res.json(items))
    .catch((err) => res.status(500).send(err));
};

exports.postBucketlist = (req, res, next) => {
  isValid(req);

  const { todo, status, finishDate } = req.body;
  const newTodo = {};
  newTodo.user = req.user.id;
  if (todo) newTodo.todo = todo;
  if (status) newTodo.status = status;

  BucketList.findOne({
    user: req.user.id,
    _id: req.body._id,
  })
    .then((todo) => {
      if (todo) {
        todo.status = status;
        if (status === "done") {
          todo.finishDate = setDate();
        } else {
          todo.finishDate = null;
        }
      } else {
        todo = new BucketList(newTodo);
      }
      todo.save().then((todo) => {
        res.json(todo);
      });
    })
    .catch((err) => {
      res.status(500).send(err.toString());
    });
};

exports.deleteBucketlist = (req, res, next) => {
  BucketList.findOneAndDelete({ user: req.user.id, _id: req.body.id })
    .then(() => res.status(200).end())
    .catch((err) => res.status(500).send(err));
};

exports.getCalendar = (req, res, next) => {
  ToDo.find({
    user: req.user.id,
    date: {
      $gte: new Date(`${req.query.year}-${req.query.month}-01`),
      $lte: new Date(
        `${req.query.year}-${req.query.month}-${req.query.daysInMonth}`
      ),
    },
  })
    .then((todos) => res.json(todos))
    .catch((err) => res.status(500).send(err));
};

exports.postCalendar = (req, res, next) => {
  isValid(req);

  const { todo, status, date } = req.body;
  const newTodo = {};
  newTodo.user = req.user.id;
  if (todo) newTodo.todo = todo;
  if (status) newTodo.status = status;
  if (date) newTodo.date = date;

  ToDo.findOne({
    user: req.user.id,
    _id: req.body._id,
  })
    .then((todo) => {
      if (todo) {
        todo.status = status;
      } else {
        todo = new ToDo(newTodo);
      }
      todo.save().then((todo) => {
        res.json(todo);
      });
    })
    .catch((err) => {
      res.status(500).send(err.toString());
    });
};

exports.deleteCalendar = (req, res, next) => {
  ToDo.findOneAndDelete({ user: req.user.id, _id: req.body.id })
    .then(() => res.status(200).end())
    .catch((err) => res.status(500).send(err));
};
