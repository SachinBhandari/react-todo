import gql from 'graphql-tag';

const GET_TODOS = gql`
  query getTodos($status: String) {
    getTodos(status: $status) {
      task
      _id
      status
      createdAt
    }
  }
`;

export default GET_TODOS;
