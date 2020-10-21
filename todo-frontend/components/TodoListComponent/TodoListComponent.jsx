import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import LineItems from '../LineItems';

/**
 * @abstract
 * This component will render the data provided to it and provide the mutation functionality
 * depending upon the status of the data, which is either the task is pending or in
 * completed state
 * ----
 * You can provide other props to it using which it will decorate the line items
 */

const TodoListComponent = ({
  showIfEmpty, heading, data, disableText, noDataHeading,
}) => {
  if (data.length === 0 && !showIfEmpty) {
    return null;
  }

  const textStyleClass = disableText ? 'disable-todo-items' : '';

  let itemList;

  if (data.length === 0) {
    itemList = (
      <List>
        <ListItemText>
          {noDataHeading}
        </ListItemText>
      </List>
    );
  } else {
    itemList = data.map(item => (
      <LineItems
        key={item._id}
        status={item.status}
        task={item.task}
        updateTodoStatus={()=>{}}
        removeTodo={()=>{}}
        editTodo={()=>{}}
        _id={item._id}
        classes={textStyleClass}
      />
    ));
  }

  return (
    <List dense>
      {heading.length && (
        <Typography variant="h6">
          {heading}
        </Typography>
      )}
      {itemList}
    </List>
  );
};

TodoListComponent.defaultProps = {
  data: [],
  showIfEmpty: true,
  heading: '',
  disableText: false,
};

TodoListComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  showIfEmpty: PropTypes.bool,
  heading: PropTypes.string,
  disableText: PropTypes.bool,
  noDataHeading: PropTypes.string.isRequired,
};

export default React.memo(TodoListComponent);
