import gql from 'graphql-tag';

const EDIT_TODO = gql`
    mutation editTodo($task: String!, $_id: String!){
        editTodo(input: {
            task: $task,
            _id: $_id,
        }){
            _id
            task
            status
            createdAt
        }
    }
`;

export default EDIT_TODO;
