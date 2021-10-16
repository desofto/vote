const { gql } = require('apollo-server-express')

const path = require('path')
const abilities = require(path.resolve('lib/abilities'))
const { User } = require(path.resolve('models'))

module.exports = {
  schema: gql`
    type User {
      id: ID
      fullName: String
      accessCode: String
      isAdmin: Boolean
    }

    type Query {
      users: [User]
      user(id: ID!): User
    }

    input NewUser {
      fullName: String
      isAdmin: Boolean
    }

    type Mutation {
      userCreate(user: NewUser): User
      userDestroy(id: ID!): Boolean
    }
  `,

  queries: {
    async users(_parent, _args, { currentUser }, _info) {
      const users = await User.findAll()
      users.forEach(user => abilities.authorize('read', user, currentUser))

      return users
    },

    async user(_parent, { id }, { currentUser }, _info) {
      const user = await User.findByPk(id)
      abilities.authorize('read', user, currentUser)

      return user
    }
  },

  mutations: {
    async userCreate(_parent, { user: attributes }, { currentUser }, _info) {
      const user = await User.build(attributes)
      abilities.authorize('create', user, currentUser)
      await user.save()

      return user
    },

    async userDestroy(_parent, { id }, { currentUser }, _info) {
      const user = await User.findByPk(id)
      abilities.authorize('delete', user, currentUser)
      await user.destroy()

      return true
    }
  }
}
