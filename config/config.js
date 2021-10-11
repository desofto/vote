'use strict'

const fs = require('fs')
const yaml = require('js-yaml')

function loadYamlFile(filepath, required = false) {
  try {
    return yaml.load(fs.readFileSync(filepath, 'utf8'))
  } catch (e) {
    if(required) {
      console.log(`file ${filepath} not found: ${e.message}`)
    }
    return {}
  }
}

function load() {
  const commonConfig = loadYamlFile(__dirname + '/config.yml')
  const localConfig = loadYamlFile(__dirname + '/config/config.local.yml', false)
  const config = Object.assign({}, commonConfig, localConfig)

  return config || {}
}

module.exports = load()
