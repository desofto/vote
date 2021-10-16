const { gql } = require('apollo-server-express')
const { create } = require('domain')

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

    input NewUser {
      fullName: String
      isAdmin: Boolean
    }

    type UserService {
      all: [User]
      find(id: ID!): User
      create(user: NewUser): User
      destroy(id: ID!): Boolean
    }

    type Query {
      User: UserService
    }
  `,

  queries: {
    User: (_parent, _args, { currentUser }, _info) => ({
      async all() {
        const users = await User.findAll()
        users.forEach(user => abilities.authorize('read', user, currentUser))

        return users
      },

      async find(id) {
        const user = await User.findByPk(id)
        abilities.authorize('read', user, currentUser)

        return user
      },

      async create({ user: attributes }) {
        const user = await User.build(attributes)
        abilities.authorize('create', user, currentUser)
        await user.save()

        return user
      },

      async destroy({ id }) {
        const user = await User.findByPk(id)
        abilities.authorize('delete', user, currentUser)
        await user.destroy()

        return true
      }
    })
  },

  mutations: {
  }
}
