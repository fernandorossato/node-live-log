require('dotenv').config({ path: ['.env'] })

const port = process.env.LOG_PORT ? parseInt(process.env.LOG_PORT) : 3010
const host = process.env.LOG_HOST || '127.0.0.1'
const dateFomat = process.env.LOG_DATE_FORMAT || 'DD-MM-YYYY HH:mm:ss.SSS'

const logMethods = new Map([
  ['error', 0],
  ['warn', 1],
  ['info', 2],
  ['debug', 3]
])

const consoleLevel = process.env.LOG_LEVEL ? logMethods.get(process.env.LOG_LEVEL.toLocaleLowerCase()) : logMethods.get('error')

const httpServer = require("http").createServer()
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  allowEIO3: true
})
const moment = require('moment')

httpServer.listen(port, host)
console.log(`Node live log running at port ${port} on ${host} at console level ${Array.from(logMethods.keys())[consoleLevel]}`)

function logFormatter(msg, type, modulo, ...args) {
  if (msg instanceof Error) {
      msg = msg.stack
  }
  if (typeof msg === 'object') {
      msg = JSON.stringify(msg)
  }
  for (const arg of args) {
      if (arg instanceof Error) {
          msg += ` ${arg.stack}`
      }
      else if (typeof arg === 'object') {
          msg += ` ${JSON.stringify(arg)}`
      } else {
          msg += ` ${arg}`
      }
  }
  const logType = type ? `- [${type.toUpperCase()}]` : '-'
  return `[${moment().format(dateFomat)}] - [${modulo}] ${logType} ${msg}`
}

module.exports = (root) => {
  const module = {};

  module.root = root

  module.info = (msg, ...args) => {
    const msgLog = logFormatter(msg, 'info', module.root, ...args)
    io.emit('log-info', msgLog)
    if (consoleLevel >= logMethods.get('info')) {
      console.info(msgLog)
    }
  }

  module.warn = (msg, ...args) => {
    const msgLog = logFormatter(msg, 'warn', module.root, ...args)
    io.emit('log-warn', msgLog)
    if (consoleLevel >= logMethods.get('warn')) {
      console.warn(msgLog)
    }
  }

  module.error = (msg, ...args) => {
    const msgLog = logFormatter(msg, 'error', module.root, ...args)    
    io.emit('log-error', msgLog)
    console.error(msgLog)
  }

  module.debug = (msg, ...args) => {
    const msgLog = logFormatter(msg, 'debug', module.root, ...args)
    io.emit('log-debug', msgLog)
    if (consoleLevel >= logMethods.get('debug')) {
      console.debug(msgLog)
    }
  }

  return module;
}