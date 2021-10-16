const { gql } = require('apollo-server-express')

const path = require('path')
const abilities = require(path.resolve('lib/abilities'))
const { Event } = require(path.resolve('models'))

module.exports = {
  schema: gql`
    type Event {
      id: ID
      title: String
      date: Date
    }

    type Query {
      events: [Event]
      event(id: ID!): Event
    }

    input NewEvent {
      title: String
    }

    type Mutation {
      eventsAdd(event: NewEvent): Event
    }
  `,

  queries: {
    async events(_parent, _args, { currentUser }, _info) {
      const events = await Event.findAll()
      users.forEach(event => abilities.authorize('read', event, currentUser))
    },

    async event(_parent, { id }, { currentUser }, _info) {
      const event = await Event.findByPk(id)
      abilities.authorize('read', event, currentUser)

      return event
    }
  },

  mutations: {
    async eventsAdd(_parent, { event: attributes }, { currentUser }, _info) {
      const event = await Event.build(attributes)
      abilities.authorize('read', event, currentUser)
      await event.save()

      return event
    }
  }
}
