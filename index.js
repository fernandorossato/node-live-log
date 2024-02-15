require('dotenv').config({ path: ['.env.log'] })

const port = process.env.LOG_PORT ? parseInt(process.env.LOG_PORT) : 3010
const host = process.env.LOG_HOST || '127.0.0.1'
const dateFomat = process.env.LOG_DATE_FORMAT || 'DD-MM-YYYY HH:mm:ss.SSS'

const httpServer = require("http").createServer()
const io = require("socket.io")(httpServer)
const moment = require('moment')

httpServer.listen(port, host)
console.log(`Node live log running at port ${port} on ${host}`)

module.exports = (root) => {
  const module = {};

  module.root = root

  module.info = (msg, ...args) => {
    const msgLog = moment().format(dateFomat) + ` [${module.root}] [info] - ${msg} ` + args.join(',')
    io.emit('log-info', msgLog)
  }

  module.warn = (msg, ...args) => {
    const msgLog = moment().format(dateFomat) + ` [${module.root}] [warn] - ${msg} ` + args.join(',')
    io.emit('log-warn', msgLog)
  }

  module.error = (msg, ...args) => {
    const msgLog = moment().format(dateFomat) + ` [${module.root}] [error] - ${msg} ` + args.join(',')
    io.emit('log-error', msgLog)
  }

  module.debug = (msg, ...args) => {
    const msgLog = moment().format(dateFomat) + ` [${module.root}] [debug] - ${msg} ` + args.join(',')
    io.emit('log-debug', msgLog)
  }

  return module;
}