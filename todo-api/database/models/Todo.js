const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    task: String,
    status: { type: String, enum: ['completed', 'pending'], default: 'pending' }
  },
  { timestamps: true }
);

const Todo = mongoose.model('todo', schema);

module.exports = Todo;
