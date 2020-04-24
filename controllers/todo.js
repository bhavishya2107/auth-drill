const Todo = require("../models/Todo");

//create todo
exports.createTodo = async (req, res) => {
  try {
    if (req.user.isMentor) {
      var todo = await Todo.create(req.body);
      if (!todo) return res.status(400).json({ msg: "todo not created" });
      res.json({ success: true, msg: "todo created successfully" });
    } else {
      res.json({ msg: "you are not mentor to assign a task" });
    }
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};

//all todos
exports.allTodos = async (req, res) => {
  try {
    var todos = await Todo.find()
    if(!todos) return res.status(400).json({err:"no todos"})
    res.json({success:"true", todos})
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};
