"use strict";

module.exports = ({ strapi }) => ({
  async createTask(task) {
    const createdTask = await strapi.entityService.create("plugin::todo.task", {
      data: task,
    });
    return createdTask;
  },
});
