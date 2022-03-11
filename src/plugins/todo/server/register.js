"use strict";

module.exports = ({ strapi }) => {
  Object.values(strapi.contentTypes).forEach((contentType) => {
    // Add tasks property
    contentType.attributes.tasks = {
      type: "relation",
      relation: "morphMany",
      target: "plugin::todo.task",
      morphBy: "related",
      writable: false,
      private: false,
      consigurable: false,
      visible: false,
    };
  });
};
