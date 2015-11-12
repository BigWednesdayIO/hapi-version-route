'use strict';

exports.register = function (server, options, next) {
  if (!process.env.npm_package_version) {
    return next(new Error('npm_package_version variable missing. Please use npm start!'));
  }

  server.route({
    method: 'GET',
    path: options.path || '/version',
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
  pkg: require('./package.json')
};
