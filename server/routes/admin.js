'use strict';

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'POST',
      path: '/',
      handler: 'tasks.create',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
    {
      method: 'GET',
      path: '/:slug',
      handler: 'tasks.listRelatedTasks',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
  ],
};
