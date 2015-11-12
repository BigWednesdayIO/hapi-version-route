'use strict';

const expect = require('chai').expect;
const Hapi = require('hapi');

const plugin = require('../index');

describe('Plugin', () => {
  let server;
  let versionResponse;

  before(done => {
    server = new Hapi.Server();
    server.connection({});

    server.register([{register: plugin}], err => {
      if (err) {
        return done(err);
      }

      server.inject({url: '/version', method: 'GET'}, response => {
        versionResponse = response;
        done();
      });
    });
  });

  it('returns a 200 response from version endpoint', () => {
    expect(versionResponse.statusCode).to.equal(200);
  });

  it('returns the server version from npm_package_version', () => {
    expect(versionResponse.result.version).to.equal(process.env.npm_package_version);
  });
});
