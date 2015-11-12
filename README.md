# hapi-version-route
Exposes package.json version through a version route for a hapi server.

Inspired by [hapi university](https://github.com/hapijs/university), and useful for version checking deployed servers, basic monitoring, smoke testing etc.

[![Circle CI](https://circleci.com/gh/BigWednesdayIO/hapi-version-route/tree/master.svg?style=svg&circle-token=55dd5f4bfaf507f4cb2df8b0cc5d8d6b6f629f70)](https://circleci.com/gh/BigWednesdayIO/hapi-version-route/tree/master)

## Requirements

Uses [package.json variables](https://docs.npmjs.com/misc/scripts#package-json-vars) to determine the server version so requires you run your server with `npm start` instead of `node <script>`.

## Usage

Install

```sh
npm install --save hapi-version-route
```

Register plugin

```node
server.register({
  register: require('hapi-version-route')
}, function(err) {
  ...
});
```

Consume

```
GET /version
{
  "version": "x.x.x"
}
```

## Plugin options

path - register your own path, instead of /version
