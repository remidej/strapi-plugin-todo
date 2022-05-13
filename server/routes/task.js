'use strict';

/**
 *  router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('plugin::todo.task');
