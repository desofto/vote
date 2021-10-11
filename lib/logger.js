'use strict'

const LOG_DEBUG = 1
const LOG_INFO = 2
const LOG_WARN = 3
const LOG_ERROR = 4

function pad(str, char = ' ', width = 2) {
  str = String(str)
  while (str.length < width) {
    str = char + str
  }
  return str
}

/**
 * @class Logger
 *
 * Use `logger.info(JSON.stringify(message, null, 2))` for better formatting.
 */
class Logger {
  constructor (level) {
    this.level = level || LOG_INFO
  }

  debug() {
    if (this.level > LOG_DEBUG) { return }

    const args = this.format(Array.from(arguments))
    args.unshift(
      '[' + this.now() + ']',
      '[debug]'
    )
    console.debug.apply(null, args)
  }

  info() {
    if (this.level > LOG_INFO) { return }

    const args = this.format(Array.from(arguments))
    args.unshift(
      '[' + this.now() + ']',
      '[info]'
    )
    console.log.apply(null, args)
  }

  warn() {
    if (this.level > LOG_WARN) { return }

    const args = this.format(Array.from(arguments))
    args.unshift(
      '[' + this.now() + ']',
      '[warn]'
    )
    console.warn.apply(null, args)
  }

  error() {
    if (this.level > LOG_ERROR) { return }

    const args = this.format(Array.from(arguments))
    args.unshift(
      '[' + this.now() + ']',
      '[error]'
    )
    console.error.apply(null, args)
  }

  format(args) {
    return args.map(e => e instanceof Object ? JSON.stringify(e, null, 2) : e)
  }

  now() {
    let now = new Date()

    return [
      [
        now.getFullYear(),
        pad(now.getMonth()+1, '0', 2),
        pad(now.getDate(), '0', 2)
      ].join('-'),
      [
        pad(now.getHours(), '0', 2),
        pad(now.getMinutes(), '0', 2),
        pad(now.getSeconds(), '0', 2)
      ].join(':')
    ].join(' ')
  }
}

const path = require('path')
const config = require(path.resolve('config'))

module.exports = new Logger(config.log.level || LOG_DEBUG)
