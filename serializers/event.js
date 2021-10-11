'use strict'

const { Serializer } = require('jsonapi-serializer')

module.exports = new Serializer('events', {
  keyForAttribute: 'underscore_case',
  //!!! including stats per user
  attributes: [
    'id',
    'date',
    'title',
    'createdAt',
    'updatedAt'
  ]
})
