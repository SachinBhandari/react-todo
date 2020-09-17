const mongoose = require('mongoose');

const todo = {
  task: String,
  status: {
    type: String,
    enum: ['completed', 'pending'],
    default: 'pending',
  },
  timestamp: {
    type: Date,
    default: new Date(),
  },
};

const schema = new mongoose.Schema(
  {
    ...todo,
    children: [todo]
  },
);

const Todo = mongoose.model('todo', schema);

module.exports = Todo;
