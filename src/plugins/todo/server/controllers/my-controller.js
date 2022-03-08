'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('todo')
      .service('myService')
      .getWelcomeMessage();
  },
};
