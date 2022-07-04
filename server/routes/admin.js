'use strict';

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'POST',
      path: '/tasks',
      handler: 'tasks.createTask',
    },
    {
      method: 'PUT',
      path: '/tasks/:id',
      handler: 'tasks.updateTask',
    },
    {
      method: 'GET',
      path: '/tasks/:slug',
      handler: 'tasks.listRelatedTasks',
    },
  ],
};
