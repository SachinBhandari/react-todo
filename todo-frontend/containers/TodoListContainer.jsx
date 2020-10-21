import React, { useContext } from 'react';
import { string } from 'prop-types';

import useQuery from '../lib/useQuery';
import TodoListPlaceHolder from '../components/TodoListPlaceHolder';
import TodoListComponent from '../components/TodoListComponent/TodoListComponent';
import TodoContext from "../context/TodoContext";

const TodoListContainer = ({ status, visibility }) => {
  const [state, dispatch] = useContext(TodoContext);
  const { todos } = state;
  const { loading, error, data } = useQuery({
    method: 'get',
    url: 'TODO',
    auth: true,
  });

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
