import React from 'react';

import TextField from '@material-ui/core/TextField';

const AddTodo = () => {

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
