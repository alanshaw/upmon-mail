var xtend = require('xtend')
var config = require('rc')('upmon')
var mail = require('./mail')

config.mail = config.mail || {}

module.exports = function (opts) {
  opts = opts || {}
  return mail(xtend(config.mail, opts))
}