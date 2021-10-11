'use strict'

const { Client } = require('@elastic/elasticsearch')

const path = require('path')
const config = require(path.resolve('config'))

module.exports = new Client({
  node: config.elasticsearch.url
})
