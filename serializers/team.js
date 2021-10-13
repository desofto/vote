'use strict'

const { Serializer } = require('jsonapi-serializer')

module.exports = new Serializer('teams', {
  keyForAttribute: 'underscore_case',
  //!!! including stats per user
  attributes: [
    'id',
    'title',
    'state',
    'createdAt',
    'updatedAt'
  ]
})
