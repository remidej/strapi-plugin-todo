'use strict';

const controller = {
  async listRelatedTasks(ctx) {
    const { slug } = ctx.params;
    const { id } = ctx.query;
    const tasksService = strapi.plugin('todo').service('tasks');
    return tasksService.listRelatedTasks({ slug, id });
  },
  async create(ctx) {
    return ['task'];
  },
}

module.exports = controller;
