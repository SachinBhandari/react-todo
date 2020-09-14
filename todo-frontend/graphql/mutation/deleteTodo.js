import gql from 'graphql-tag';

const DELETE_TODO = gql`
    mutation deleteTodo($_id: String!){
        deleteTodo(input: {
            _id: $_id,
        }){
            _id
            task
            status
            createdAt
        }
    }
`;

export default DELETE_TODO;
