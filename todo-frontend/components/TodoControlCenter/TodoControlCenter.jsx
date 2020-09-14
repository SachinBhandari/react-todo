import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { oneOf, func } from 'prop-types';

import DELETE_COMPLETED_TODO from '../../graphql/mutation/deleteCompletedTodo';
import GET_TODOS from '../../graphql/query/getTodos';

const TodoControlCenter = ({ visibility, setVisibility }) => {
  const [deleteCompletedTodo] = useMutation(DELETE_COMPLETED_TODO, {
    update: (cache, { data: { deleteCompletedTodo: deleteCount } }) => {
      if (parseInt(deleteCount, 10)) {
        cache.writeQuery({
          query: GET_TODOS,
          variables: { status: 'completed' },
          data: { getTodos: [] }
        });
      }
    }
  });

  const onChangeVisibility = (e, newVisibility) => {
    if (!visibility) return;
    setVisibility(newVisibility);
  };

  return (
    <Grid container justify="space-between">
      <Grid item>
        <ToggleButton
          onClick={deleteCompletedTodo}
          value="delete"
        >
          Delete Completed
        </ToggleButton>
      </Grid>
      <Grid item>
        <ToggleButtonGroup
          value={visibility}
          exclusive
          onChange={onChangeVisibility}
          aria-label="text alignment"
        >
          <ToggleButton value="all" aria-label="all todos">
            <Typography variant="button">All</Typography>
          </ToggleButton>
          <ToggleButton value="pending" aria-label="pending todos">
            <Typography variant="button">Pending</Typography>
          </ToggleButton>
          <ToggleButton value="completed" aria-label="completed todos">
            <Typography variant="button">Completed</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};

TodoControlCenter.defaultProps = {
  visibility: 'all',
};

TodoControlCenter.propTypes = {
  visibility: oneOf(['all', 'pending', 'completed']),
  setVisibility: func.isRequired,
};

export default TodoControlCenter;
