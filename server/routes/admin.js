const routes = [
  {
    method: 'POST',
    path: '/',
    handler: 'task.create',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/',
    handler: 'task.index',
    config: {
      policies: [],
    },
  },
];

module.exports = routes;
