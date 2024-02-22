const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const apiUrl = process.env.NODE_ENV === 'production' ? `${process.env.BASE_URL}` : 'http://localhost:3010'

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


  // Listen the server
  /* app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  }) */

  mongoose.set('useFindAndModify', false);
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);

  const User = require('./models/user')

  dotenv.config()

  const app = express()


  // debugger
  mongoose.connect(process.env.DATABASEURI, err => {
    if(err) {
        console.log(err)
    } else {
        console.log('Connected to the database')
    }
  })

  // Middlewares
  app.use(morgan('dev'))
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))


  // require APIs
  const productRoutes = require('./routes/product')
  const categoryRoutes = require('./routes/category')
  const ownerRoutes = require('./routes/owner')
  const userRoutes = require('./routes/auth')
  const reviewRoutes = require('./routes/review')
  const addressRoutes = require('./routes/address')
  const paymentRoutes = require('./routes/payment')
  const orderRoutes = require('./routes/order')
  const searchRoutes = require('./routes/search')

  app.use(productRoutes)
  app.use(categoryRoutes)
  app.use(ownerRoutes)
  app.use(userRoutes)
  app.use(reviewRoutes)
  app.use(addressRoutes)
  app.use(paymentRoutes)
  app.use(orderRoutes)
  app.use(searchRoutes)

  app.get('/', (req, res) => {
    res.send('Welcome to amazon clone backend api!')
  })

  // Routers registeration
  // app.use('', apiRoutes);
  // app.use('/product-heroes', productHeroRoutes);
  // app.use('/users', usersRoutes);
  // app.use('/products', productRoutes);
  // app.use('/categories', categoryRoutes);
  // app.use('/blogs', blogRoutes);

  const port = process.env.PORT || 3010

  /* app.use(
    createProxyMiddleware({
      target: 'http://localhost:3010/',
      changeOrigin: true,
      pathFilter: '/api/',
    }),
  ); */


  app.use(
    '/api',
    createProxyMiddleware({
        target: apiUrl,
        // secure: false,
        changeOrigin: true, //
        logLevel: 'debug',
        pathRewrite: {
            '^/api': '',
        },
    })
)

  const server = app.listen(port, () => {
    console.log('server is running on port', server.address().port);
  });
}
start()

/* module.exports = {
  path: '/api',
  handler: app
} */


