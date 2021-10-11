'use strict'

const { Serializer } = require('jsonapi-serializer')

module.exports = new Serializer('users', {
  keyForAttribute: 'underscore_case',
  attributes: [
    'id',
    'fullName',
    'isAdmin',
    'createdAt',
    'updatedAt'
  ]
})
