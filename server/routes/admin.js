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
      method: 'GET',
      path: '/tasks/:slug',
      handler: 'tasks.listRelatedTasks',
    },
  ],
};
