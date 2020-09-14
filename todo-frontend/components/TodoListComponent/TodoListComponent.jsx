import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import UPDATE_TODO from '../../graphql/mutation/updateTodo';
import GET_TODOS from '../../graphql/query/getTodos';
import DELETE_TODO from '../../graphql/mutation/deleteTodo';
import EDIT_TODO from '../../graphql/mutation/editTodo';
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
  const [updateTodoStatus] = useMutation(UPDATE_TODO, {
    update: (cache, { data: { updateTodo } }) => {
      if (updateTodo._id) {
        const { getTodos: pendingTodos } = cache.readQuery({
          query: GET_TODOS,
          variables: { status: 'pending' }
        });

        const { getTodos: completedTodos } = cache.readQuery({
          query: GET_TODOS,
          variables: { status: 'completed' }
        });

        if (updateTodo.status === 'completed') {
          // removing the todo from pendingTodos list

          const filteredTodos = pendingTodos.filter(pendingTodo => (
            updateTodo._id !== pendingTodo._id
          ));

          cache.writeQuery({
            query: GET_TODOS,
            variables: { status: 'pending' },
            data: { getTodos: filteredTodos }
          });

          cache.writeQuery({
            query: GET_TODOS,
            variables: { status: 'completed' },
            data: { getTodos: [updateTodo, ...completedTodos] }
          });
        } else {
          // removing the todo from completedTodos list

          const filteredTodos = completedTodos.filter(completedTodo => (
            updateTodo._id !== completedTodo._id
          ));

          cache.writeQuery({
            query: GET_TODOS,
            variables: { status: 'completed' },
            data: { getTodos: filteredTodos }
          });

          cache.writeQuery({
            query: GET_TODOS,
            variables: { status: 'pending' },
            data: { getTodos: [updateTodo, ...pendingTodos] }
          });
        }
      }
    },
  });

  const [editTodo] = useMutation(EDIT_TODO);

  const [removeTodo] = useMutation(DELETE_TODO, {
    update: (cache, { data: { deleteTodo } }) => {
      const { getTodos: targetTodos } = cache.readQuery({
        query: GET_TODOS,
        variables: { status: deleteTodo.status }
      });

      const filterTodos = targetTodos.filter(
        targetTodo => targetTodo._id !== deleteTodo._id
      );

      cache.writeQuery({
        query: GET_TODOS,
        variables: { status: deleteTodo.status },
        data: { getTodos: filterTodos }
      });
    },
  });

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
        updateTodoStatus={updateTodoStatus}
        removeTodo={removeTodo}
        editTodo={editTodo}
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
