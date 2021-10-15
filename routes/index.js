module.exports = app => {
  app.use('/users', require('./users'))
  app.use('/auth', require('./auth'))
  app.use('/events', require('./events'))
  app.use('/events/:event_id/stages', require('./stages'))
  app.use('/events/:event_id/teams', require('./teams'))
  app.use('/dashboard', require('./dashboard'))
}
