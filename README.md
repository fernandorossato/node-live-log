# Node live log

Module to generate logs in real time through socket.io.

## Install

```bash
npm i node-live-log
```

## Usage

In your application

```js
const log = require("node-live-log")("Your module name or identifier");
log.info("Log with args", "Arg1", "Arg2", "...Args");
log.warn(`Warn log`);
log.error("Error log");
log.debug("Debug log");
```

To view the logs generated by your application you need to write a client. Basically you can do:

```js
const io = require("socket.io-client");
const client = io("ws://localhost:3010");

client.on("log-info", (msg) => {
  console.log(msg);
});

client.on("log-warn", (msg) => {
  console.log(msg);
});

client.on("log-error", (msg) => {
  console.log(msg);
});

client.on("log-debug", (msg) => {
  console.log(msg);
});
```

You can consult a more advanced example at this link [advanced client](exemple/client.js)

## Advanced Settings

(this is optional) You can create a `.env.log` file in the root of your project with the following options:

```dosini
LOG_PORT=3010 # Port that the log server will open for client connections, by default its is 3010
LOG_HOST='127.0.0.1' # Host address where the server will run, by default it is localhost.
LOG_DATE_FORMAT='DD-MM-YYYY HH:mm:ss.SSS' # Date format that the log will display, by default it is 'DD-MM-YYYY HH:mm:ss.SSS'
```