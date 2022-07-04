'use strict';

module.exports = ({ strapi }) => ({
  async createTask(data) {
    return strapi.entityService.create('plugin::todo.task', { data });
  },

  async listRelatedTasks({ slug, id }) {
    return strapi.db.query('plugin::todo.task').findMany({
      where: {
        // Only pass the related ID if it's pointing to a collection type
        ...(id !== "" && ({
          target_id: id,
        })),
        target_type: slug,
      },
    });
  },

});
