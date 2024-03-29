const express = require('express');
const config = require('../nuxt.config.js')
const { Nuxt, Builder } = require('nuxt')
const {handler, path} = require('./index.js')

// dotenv.config()

const app = express()

config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  /* const nuxt = new Nuxt(config)
  const { host, port } = nuxt.options.server */

  // Build only in dev mode
  /* if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  } */

  // Give nuxt middleware to express
  // app.use(nuxt.render)

  const port = process.env.PORT || 3000

  // Listen the server
  /* app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  }) */

  handler()

  const server = app.listen(port, () => {
    console.log('server is running on port', server.address().port);
  });
}
start()
