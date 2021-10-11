'use strict'

const { Deserializer } = require('jsonapi-serializer')

module.exports = new Deserializer({
  keyForAttribute: 'camelCase'
})
