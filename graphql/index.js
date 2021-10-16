const jwt = require('jsonwebtoken')
const path = require('path')
const config = require(path.resolve('config'))
const { User } = require(path.resolve('models'))

module.exports = async app => {
  const { ApolloServer, gql } = require('apollo-server-express')

  let typeDefs = gql`
    scalar Date

    enum State {
      initial
      started
      finished
    }
  `

  const resolvers = { Query: {}, Mutation: {} }

  const files = ['users', 'events']
  files.forEach(file => {
    const module = require('./' + file)
    typeDefs = gql`
      ${typeDefs}
      ${module.schema}
    `
    resolvers.Query = Object.assign(resolvers.Query, module.queries)
    resolvers.Mutation = Object.assign(resolvers.Mutation, module.mutations)
  })

  const context = async ({ req }) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]
    if (!token) return {}

    return {
      currentUser: await User.findByPk(jwt.verify(token, config.jwtSecret).id)
    }
  }

  const server = new ApolloServer({ typeDefs, resolvers, context })
  await server.start()
  server.applyMiddleware({ app })
}
