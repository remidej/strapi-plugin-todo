// path: ./src/plugins/my-plugin/server/content-types/content-type-a.js

module.exports = {
  info: {
    tableName: "task",
    singularName: "task", // kebab-case mandatory
    pluralName: "tasks", // kebab-case mandatory
    displayName: "Task",
    description: "A task in Strapi",
    kind: "collectionType",
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {
    "content-manager": {
      visible: true,
    },
    "content-type-builder": {
      visible: true,
    },
  },
  attributes: {
    text: {
      type: "string",
      min: 1,
      configurable: false,
    },
    related: {
      type: "relation",
      relation: "morphToOne",
    },
  },
};
