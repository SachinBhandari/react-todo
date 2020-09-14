import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import InputBase from '@material-ui/core/InputBase';

/**
 * @abstract
 * This component will print the line items and trigger the actions on the
 * particular line items, which are delete, edit, check, un-check
 * -----
 * Also a item will be saved when the line item is edited and onBlur is fired on that
 * particular html node
 */

const LineItems = ({
  updateTodoStatus, _id, task, status, classes, removeTodo, editTodo
}) => {
  function onBlur(e) {
    const { value } = e.target;
    if (value === task) return;
    editTodo({ variables: { task: value, _id } });
  }

  function onToggle(e) {
    const newStatus = e.target.checked ? 'completed' : 'pending';
    updateTodoStatus({ variables: { task, _id, status: newStatus } });
  }

  function onDelete() {
    removeTodo({ variables: { _id } });
  }

  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={status === 'completed'}
          onChange={onToggle}
          tabIndex={-1}
          disableRipple
        />
      </ListItemIcon>
      <ListItemText className={classes}>
        {
          status === 'completed'
            ? task
            : (
              <InputBase
                defaultValue={task}
                fullWidth
                inputProps={{
                  onBlur,
                }}
              />
            )

        }
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

LineItems.defaultProps = {
  classes: ''
};

LineItems.propTypes = {
  status: PropTypes.string.isRequired,
  task: PropTypes.string.isRequired,
  updateTodoStatus: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  classes: PropTypes.string,
};

export default React.memo(LineItems);
