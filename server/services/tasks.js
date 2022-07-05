'use strict';

module.exports = ({ strapi }) => ({
  async createTask(data) {
    return strapi.entityService.create('plugin::todo.task', { data });
  },

  async updateTask({ id, data }) {
    return strapi.entityService.update('plugin::todo.task', id, { data });
  },

  async deleteTask(id) {
    return strapi.entityService.delete('plugin::todo.task', id);
  },

  async listRelatedTasks({ id, slug }) {
    return strapi.db.query('plugin::todo.task').findMany({
      where: {
        // Only pass the related ID if it's pointing to a collection type
        ...(id !== '' && {
          target_id: id,
        }),
        target_type: slug,
      },
    });
  },
});
