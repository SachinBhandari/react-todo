import React from 'react';
import { render } from 'react-dom';

import Todo from '../components/Todo';
import Layout from '../components/Layout';
import { TodoProvider } from "../context/TodoContext";

const App = (
  <Layout heading="Anywhere Todo">
    <TodoProvider>
      <Todo/>
    </TodoProvider>
  </Layout>
);

render(App, document.getElementById('app'));
