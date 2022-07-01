const routes = [
  {
    method: 'POST',
    path: '/',
    handler: 'task.create',
    config: {
      policies: [],
    },
  },
];

module.exports = routes;
