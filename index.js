'use strict';

exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/version',
    config: {
      description: 'Returns the version of the server',
      handler(request, reply) {
        reply({
          version: process.env.npm_package_version
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'version'
};
