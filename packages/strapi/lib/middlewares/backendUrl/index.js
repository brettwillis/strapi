'use strict';

/**
 * Module dependencies
 */
const { startsWith } = require('lodash');

/**
 * Admin URL hook.
 * Used to remove the backend URL prefix so that routes can match
 * when the backend is proxied via a subdirectory on the admin front-end.
 */
module.exports = strapi => {
  return {
    initialize() {
      // If the admin URL is a subdirectory then we need to activate this middleware
      const backendUrl = strapi.config.server.url;
      if (startsWith(backendUrl, '/')) {
        strapi.app.use(async (ctx, next) => {
          if (startsWith(ctx.path, backendUrl)) {
            // Remove the backendUrl prefix from the path
            ctx.path = ctx.path.slice(backendUrl.length);
          }

          await next();
        });
      }
    },
  };
};
