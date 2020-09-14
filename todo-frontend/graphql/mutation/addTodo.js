import gql from 'graphql-tag';

const ADD_TODO = gql`
    mutation addTodo($task: String!){
        createTodo(input: {
            task: $task
        }){
            _id
            task
            status
            createdAt
        }
    }
`;

export default ADD_TODO;
