"use strict";

module.exports = {
  async create(ctx) {
    ctx.body = await strapi
      .plugin("todo")
      .service("myService")
      .createTask(ctx.request.body);
  },
};
