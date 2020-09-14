import gql from 'graphql-tag';

const UPDATE_TODO = gql`
    mutation updateTodo( $_id: String!, $status: String!){
        updateTodo(input: {
            status: $status,
            _id: $_id,
        }){
            _id
            task
            status
            createdAt
        }
    }
`;

export default UPDATE_TODO;
