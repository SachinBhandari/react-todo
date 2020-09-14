const Boom = require('boom');

const Todo = require('../models/Todo');

class TodoImpl {
  static async getTodo(_id) {
    try {
      const todo = await Todo.findOne({ _id });
      return todo;
    } catch (err) {
      return Boom.badImplementation('Something went wrong while fetching task.', err);
    }
  }

  static async getTodos(status) {
    try {
      const tasks = await Todo.find({ status }).sort({ createdAt: -1 });
      return tasks;
    } catch (err) {
      return Boom.badImplementation('Something went wrong while finding tasks', err);
    }
  }

  static async createTodo(task) {
    try {
      const todo = new Todo({ task });
      return await todo.save();
    } catch (err) {
      return Boom.badImplementation('Something went wrong while creating task.', err);
    }
  }

  static async updateTodo(_id, status) {
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
      return Boom.badImplementation('Something went wrong while updating todo.', err);
    }
  }

  static editTodo(_id, task) {
    return Todo.updateOne({
      _id
    }, {
      $set: {
        task
      }
    });
  }

  static async deleteTodo(_id) {
    try {
      const deletedTodos = await Todo.findOneAndRemove({
        _id
      });
      return deletedTodos;
    } catch (err) {
      return Boom.badImplementation('Something went wrong while deleting todo.', err);
    }
  }

  static async deleteCompletedTodo() {
    try {
      const isDeleted = await Todo.remove({
        status: 'completed'
      });
      return isDeleted.deletedCount.toString();
    } catch (err) {
      return Boom.badImplementation('Something went wrong while deleting then completed todos.', err);
    }
  }
}

module.exports = TodoImpl;
