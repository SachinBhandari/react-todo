const gql = require('graphql-tag');
const merge = require('lodash.merge');

const Todo = require('./models/Todo');

module.exports = {
  typeDefs: [
    Todo.typeDefs
  ],
  resolvers: merge(Todo.resolvers)
};
