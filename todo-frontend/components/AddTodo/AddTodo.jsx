import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import TextField from '@material-ui/core/TextField';
import ADD_TODO from '../../graphql/mutation/addTodo';
import GET_TODOS from '../../graphql/query/getTodos';

const AddTodo = () => {
  const [addTodo] = useMutation(
    ADD_TODO,
    {
      update(cache, { data: { createTodo } }) {
        const { getTodos } = cache.readQuery({ query: GET_TODOS, variables: { status: 'pending' } });

        cache.writeQuery({
          query: GET_TODOS,
          variables: { status: 'pending' },
          data: { getTodos: [createTodo, ...getTodos] },
        });
      }
    }
  );

  function onSubmit(e) {
    e.preventDefault();
    const task = e.target.inputTask.value;
    if (!task.length) return;
    addTodo({ variables: { task } });
    e.target.reset();
  }

  return (
    <form onSubmit={onSubmit}>
      <TextField
        placeholder="Superbeings often jot down what's in their mind."
        size="medium"
        fullWidth
        variant="outlined"
        name="inputTask"
      />
    </form>
  );
};

export default AddTodo;
