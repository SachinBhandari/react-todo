const Todo = require('../models/Todo');

class TodoController {
  static async get(req, res) {
    const { _id } = req.query;

    try {
      const todo = await Todo.findOne({ _id });
      return res.status(200).json({
        data: todo,
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: 'Something went wrong.'
      });
    }
  }

  static async getAll(req, res) {
    try {
      const tasks = await Todo.find().sort({ createdAt: -1 });
      return res.status(200).json({
        data: tasks,
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: "Something went wrong."
      });
    }
  }

  static async create(req, res) {
    const { task } = req.body;
    try {
      const todo = new Todo({ task });
      await todo.save();
      console.log('todo: ', todo);
      return res.status(200).json({
        data: todo,
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: "Something went wrong."
      });
    }
  }

  static async update(_id, status) {
    try {
      const updatedTodo = await Todo.findOneAndUpdate(
        {
          _id
        },
        {
          $set: {
            status
          },
        },
        {
          new: true
        },
      );
      return updatedTodo;
    } catch (err) {
      return err;
    }
  }

  static edit(_id, task) {
    return Todo.updateOne({
      _id
    }, {
      $set: {
        task
      }
    });
  }

  static async delete(_id) {
    try {
      const deletedTodos = await Todo.findOneAndRemove({
        _id
      });
      return deletedTodos;
    } catch (err) {
      return err;
    }
  }

  static async deleteCompletedTodo() {
    try {
      const isDeleted = await Todo.remove({
        status: 'completed'
      });
      return isDeleted.deletedCount.toString();
    } catch (err) {
      return err;
    }
  }
}

module.exports = TodoController;
