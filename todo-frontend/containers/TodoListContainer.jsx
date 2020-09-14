import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { string } from 'prop-types';

import GET_TODOS from '../graphql/query/getTodos';
import TodoListPlaceHolder from '../components/TodoListPlaceHolder';
import TodoListComponent from '../components/TodoListComponent/TodoListComponent';

const TodoListContainer = ({ status, visibility }) => {
  const { loading, error, data } = useQuery(GET_TODOS, { variables: { status } });

  if (error) return <div>Error</div>;
  if (loading) return <TodoListPlaceHolder lines={4} />;

  const { getTodos: todos } = data;
  return (
    <TodoListComponent
      disableText={status === 'completed'}
      data={todos}
      showIfEmpty={status !== 'completed' || visibility !== 'all'}
      heading={status === 'completed' ? 'Completed task' : 'Pending task'}
      noDataHeading={`No ${status.toLowerCase()} task`}
    />
  );
};

TodoListContainer.propTypes = {
  status: string.isRequired,
  visibility: string.isRequired,
};

export default TodoListContainer;
