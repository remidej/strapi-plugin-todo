'use strict';

module.exports = ({ strapi }) => ({
  async listRelatedTasks({ slug, id }) {
    const isSingleType = id === "";
    let entry;

    if (isSingleType) {
      entry = await strapi.entityService.findMany(slug, {
        populate: { tasks: true },
      });
    } else {
      entry = await strapi.entityService.findOne(slug, id, {
        populate: { tasks: true },
      });
    }

    return entry?.tasks || [];
  }
});
