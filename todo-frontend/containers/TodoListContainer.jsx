import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';

import useQuery from '../lib/useQuery';
import TodoListPlaceHolder from '../components/TodoListPlaceHolder';
import TodoListComponent from '../components/TodoListComponent/TodoListComponent';

const TodoListContainer = ({ status, visibility }) => {
  const [todos, setTodos] = useState([]);
  const { loading, error, data } = useQuery({
    method: 'post',
    url: 'TODO',
    auth: true,
  });

  useEffect(() => {
    setTodos(data)
  }, data);

  if (error) return <div>Error</div>;
  if (loading) return <TodoListPlaceHolder lines={4} />;

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
