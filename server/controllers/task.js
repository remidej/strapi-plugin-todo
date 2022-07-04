'use strict';

/**
 *   controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('plugin::todo.task');

const controller = {
  async index(ctx) {
    return ['task'];
  },
  async create(ctx) {
    return ['task'];
  },
}

module.exports = controller;
