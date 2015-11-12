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

  it('callsback with error when npm_package_version is empty', () => {
    const version = process.env.npm_package_version;
    delete process.env.npm_package_version;

    const server = new Hapi.Server();
    server.connection({});

    server.register([{register: plugin}], err => {
      process.env.npm_package_version = version;

      expect(err).to.exist;
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.equal('npm_package_version variable missing. Please use npm start!');
    });
  });

  it('supports a custom route path', done => {
    const server = new Hapi.Server();
    server.connection({});

    server.register([{register: plugin, options: {path: '/my_version_path'}}], err => {
      if (err) {
        return done(err);
      }

      server.inject({url: '/my_version_path', method: 'GET'}, response => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});
