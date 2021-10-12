'use strict'

const path = require('path')
const logger = require(path.resolve('lib/logger'))
const config = require(path.resolve('config'))

;(async function() {
  try {
    if (process.env.NODE_ENV !== 'test') {
      const cluster = require('cluster')
      const { cpus } = require('os')
      const process = require('process')

      const numCPUs = cpus().length

      if (cluster.isMaster || cluster.isPrimary) {
        logger.debug(`Primary ${process.pid} is running`);

        for (let i = 0; i < numCPUs; i++) {
          cluster.fork()
        }

        cluster.on('online', (worker) => {
          logger.debug(`worker ${worker.process.pid} is listening`)
        })

        cluster.on('exit', (worker, code, signal) => {
          logger.debug(`worker ${worker.process.pid} died`)
          logger.debug('Starting a new worker');
          cluster.fork()
        })

        return
      }
    }

    /////////////////////////////////////////////////////////////////////////////

    const express = require('express')
    const app = express()
    app.use(express.json({ extended: true }))

    const cors = require('cors')
    app.use(cors({
      origin: "http://localhost:3000"
    }))

    app.engine('html', require('ejs').__express)
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'html')

    app.use(require('express-ejs-layouts'))
    app.set('layout', './layouts/application')

    if (process.env.NODE_ENV !== 'test') {
      app.use(
        require('morgan')([
          ':remote-addr',
          '-',
          ':remote-user',
          '[:date[clf]]',
          '":method :url HTTP/:http-version"',
          ':status',
          ':res[content-length]',
          '":referrer"',
          '":user-agent"',
          ':response-time ms'
        ].join(' '))
      )
    }

    /////////////////////////////////////////////////////////////////////////////

    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('/about', (req, res) => {
      res.status(200).render('about.html', { config })
    })

    require('./routes')(app)

    /////////////////////////////////////////////////////////////////////////////

    const sequelize = require('./lib/sequelize')
    sequelize.authenticate()

    const server = app.listen(config.port, () => {
      logger.debug(`Started on port ${config.port}`)
    })

    module.exports = server
  } catch (error) {
    logger.error('Unable to connect to the database:', error)
    console.log(error)
  }
})()
