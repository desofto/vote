module.exports = app => {
  app.use('/users', require('./users'))
  app.use('/auth', require('./auth'))
}
