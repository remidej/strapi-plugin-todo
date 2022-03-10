module.exports = [
  {
    method: "POST",
    path: "/tasks",
    handler: "myController.create",
    config: {
      policies: [],
    },
  },
];
