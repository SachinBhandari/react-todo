import React, { useReducer } from 'react';

const TodoContext = React.createContext([]);

const initialState = {
  loading: false,
  todos: [],
  error: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      return {
        ...state,
        todos: [...state.todos, action.todo],
      };
    }
    case 'DELETE': {
      const deleteTodoId = action._id;
      const deleteTodoIndex = state.todos.findIndex(({ _id }) => _id === deleteTodoId);
      const updatedTodos = [
        ...state.todos.slice(0, deleteTodoIndex),
        ...state.todos.slice(deleteTodoIndex + 1),
      ];
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    case 'UPDATE': {
      const updatedTodoId = action._id;
      const updatedTodoIndex = state.todos.findIndex(({ _id }) => _id === updatedTodoId);
      const updatedTodos = [
        ...state.todos.slice(0, updatedTodoIndex),
        action.todo,
        ...state.todos.slice(updatedTodoIndex + 1),
      ];
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    default: return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodoContext.Provider value={[state, dispatch]}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
