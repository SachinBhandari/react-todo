const mongoose = require('mongoose');

const todo = {
  task: { type: String, required: true },
  status: {
    type: String,
    enum: ['completed', 'pending'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
};

const schema = new mongoose.Schema(
  {
    ...todo,
    children: [todo]
  },
  { timestamps: true });

const Todo = mongoose.model('todo', schema);

module.exports = Todo;
