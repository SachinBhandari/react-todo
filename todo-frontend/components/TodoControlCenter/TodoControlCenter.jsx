import React from 'react';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { oneOf, func } from 'prop-types';

const TodoControlCenter = ({ visibility, setVisibility }) => {

  const onChangeVisibility = (e, newVisibility) => {
    if (!visibility) return;
    setVisibility(newVisibility);
  };

  const deleteCompletedTodo = () => {

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
