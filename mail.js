var through = require('through2')
var nodemailer = require('nodemailer')

function sendMail (type, transport, from, to, lastPing, ping) {
  var opts = {
    from: from,
    to: to,
    subject: type + ' ' + ping.url,
    text: type + ' ' + ping.url + ' (' + ping.status + ') at ' + new Date(ping.timestamp) +
          '\nLast success at: ' + new Date(lastPing.timestamp)
  }

  transport.sendMail(opts, function (er, info) {
    if (er) console.error('Failed to send ' + type + ' mail', er, info)
  })
}

var sendFailMail = sendMail.bind(null, 'FAIL')
var sendRecoverMail = sendMail.bind(null, 'RECOVER')

module.exports = function (opts) {
  opts = opts || {}

  var transport = nodemailer.createTransport(opts.transport)
  var lastPings = {}

  return through.obj(function (ping, enc, cb) {
    var lastPing = lastPings[ping.url]

    if (lastPing) {
      if (lastPing.status == 200 && ping.status != 200) {
        sendFailMail(transport, opts.from, opts.to, lastPing, ping)
      } else if (lastPing.status != 200 && ping.status == 200) {
        sendRecoverMail(transport, opts.from, opts.to, lastPing, ping)
      }
    }

    lastPings[ping.url] = ping

    this.push(ping)
    cb()
  })
}