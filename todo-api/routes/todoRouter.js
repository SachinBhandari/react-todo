const { body } = require('express-validator');

const todoController = require('../controllers/todo');

const todoRoutes = [
  {
    method: 'delete',
    path: '/:id',
    validators: [
      body('id').notEmpty(),
    ],
    middleware: [todoController.delete],
  }, {
    method: 'get',
    path: '/',
    validators: [
      body('id'),
      body('status'),
    ],
    middleware: [todoController.getAll],
  }, {
    method: 'get',
    path: '/:id',
    validators: [
      body('id').notEmpty(),
    ],
    middleware: [todoController.get],
  }, {
    method: 'put',
    path: '/:id',
    validators: [
      body('id').notEmpty(),
    ],
    middleware: [todoController.update],
  }, {
    method: 'post',
    path: '/',
    validators: [
      body('task').notEmpty(),
    ],
    middleware: [todoController.create],
  },
];

module.exports = { routes: todoRoutes, path: '/todo' };
