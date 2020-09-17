const Boom = require('boom');

const Todo = require('../database/models/Todo');

class Todo {
  static async get(_id) {
    try {
      const todo = await Todo.findOne({ _id });
      return todo;
    } catch (err) {
      return Boom.badImplementation('Something went wrong while fetching task.', err);
    }
  }

  static async getAll(status) {
    try {
      const tasks = await Todo.find({ status }).sort({ createdAt: -1 });
      return tasks;
    } catch (err) {
      return Boom.badImplementation('Something went wrong while finding tasks', err);
    }
  }

  static async create(task) {
    try {
      const todo = new Todo({ task });
      return await todo.save();
    } catch (err) {
      return Boom.badImplementation('Something went wrong while creating task.', err);
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
      return Boom.badImplementation('Something went wrong while updating todo.', err);
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

module.exports = Todo;
