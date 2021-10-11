'use strict'

const { Serializer } = require('jsonapi-serializer')

module.exports = new Serializer('stages', {
  keyForAttribute: 'underscore_case',
  //!!! including stats per user
  attributes: [
    'id',
    'title',
    'order',
    'state',
    'createdAt',
    'updatedAt'
  ]
})
