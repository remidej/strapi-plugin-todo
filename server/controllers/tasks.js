'use strict';

const { getService } = require("../utils");

const controller = {
  async createTask(ctx) {
    return getService('tasks').createTask(ctx.request.body);
  },

  async updateTask(ctx) {
    const data = ctx.request.body;
    const { id } = ctx.params;
    return getService('tasks').updateTask({ id, data });
  },

  async listRelatedTasks(ctx) {
    const { slug } = ctx.params;
    const { id } = ctx.query;
    return getService('tasks').listRelatedTasks({ slug, id });
  },
}

module.exports = controller;
