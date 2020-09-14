import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import AddTodo from './AddTodo';
import TodoListContainer from '../containers/TodoListContainer';
import TodoControlCenter from './TodoControlCenter';

const Todo = () => {
  const [visibility, setVisibility] = useState('all');

  return (
    <React.Fragment>
      <Helmet>
        <title>::TODO</title>
      </Helmet>
      <AddTodo />
      {/* in-complete/pending task */}
      {
        (visibility === 'all' || visibility === 'pending') && (
          <TodoListContainer status="pending" visibility={visibility} />
        )
      }
      {/* completed task */}
      {
        (visibility === 'all' || visibility === 'completed') && (
          <TodoListContainer status="completed" visibility={visibility} />
        )
      }
      <TodoControlCenter
        setVisibility={setVisibility}
        visibility={visibility}
      />
    </React.Fragment>
  );
};

export default Todo;
