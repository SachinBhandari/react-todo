import gql from 'graphql-tag';

const DELETE_COMPLETED_TODO = gql`
  mutation {
    deleteCompletedTodo
  }
`;

export default DELETE_COMPLETED_TODO;
