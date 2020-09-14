const TodoImpl = require('../../database/implementations/TodoImpl');

const Todo = {
  typeDefs: `
    type Todo {
      # todo id
      _id: String,
      # todo task
      task: String,
      # current status of task
      status: String
      # created time of task
      createdAt: String
      # updated time of task
      updatedAt: String 
    }

    input InputTodo {
      task: String!
    }

    input DeleteTodo {
      _id: String!
    }

    input UpdateTodo {
      _id: String!
      status: String!
    }
    
    input EditTodo {
      _id: String!,
      task: String!,
    }

    type Query {
      getTodos (status: String): [Todo]
      getTodo (_id: String): Todo  
    }

    type Mutation {
      createTodo(input: InputTodo!): Todo
      updateTodo(input: UpdateTodo!): Todo
      deleteTodo(input: DeleteTodo!): Todo
      editTodo(input: EditTodo): Todo
      deleteCompletedTodo: String
    }
  `,
  resolvers: {
    Query: {
      getTodos: (_, { status }) => TodoImpl.getTodos(status),
      getTodo: (_, { _id }) => TodoImpl.getTodo(_id),
    },
    Mutation: {
      createTodo: (_, { input: { task } }) => TodoImpl.createTodo(task),
      updateTodo: (_, { input: { _id, status } }) => TodoImpl.updateTodo(_id, status),
      deleteTodo: (_, { input: { _id } }) => TodoImpl.deleteTodo(_id),
      editTodo: (_, { input: { _id, task } }) => TodoImpl.editTodo(_id, task),
      deleteCompletedTodo: () => TodoImpl.deleteCompletedTodo(),
    }
  }
};

module.exports = Todo;
