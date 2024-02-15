const io = require('socket.io-client')

const client = io('ws://localhost:3010')

const readline = require('readline')

const FileLog = false
// const FileLog = 'my_log.txt'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'LOG CLI> '
})

client.on('connect', () => {
    console.log('Connected')
    rl.prompt(true);
})

// Listen a event log

const logInfo = (msg) => {
    console.info(msg)
    rl.prompt(true)
}

client.on('log-info', logInfo)

const logWarn = (msg) => {
    console.warn(msg)
    rl.prompt(true)
}

client.on('log-warn', logWarn)

const logError = (msg) => {
    console.error(msg)
    rl.prompt(true)
}

client.on('log-error', logError)

const logDebug = (msg) => {
    console.debug(msg)
    if(FileLog) {
        fs.appendFile(FileLog, msgLog);
    }
    rl.prompt(true)
}

client.on('log-debug', logDebug)

rl.on('line', (line) => {
    let pars = line.trim().split(' ');

    switch (pars[0]) {
        case 'sair':
        case 'quit':
        case 'q':
            rl.close()
            break
        case '':
            break
        case 'disable':
            switch (pars[1]) {
                case 'error':
                    client.removeListener('log-error', logError)
                    console.log('log-error disabled')
                    rl.prompt();
                    break
                case 'debug':
                    client.removeListener('log-debug', logDebug)
                    console.log('log-debug disabled')
                    rl.prompt();
                    break
                case 'info':
                    client.removeListener('log-info', logInfo)
                    console.log('log-info disabled')
                    rl.prompt();
                    break
                case 'warn':
                    client.removeListener('log-warn', logWarn)
                    console.log('log-warn disabled')
                    rl.prompt();
                    break
                default:
                    break
            }
        break
        case 'enable':
            switch (pars[1]) {
                case 'error':
                    client.on('log-error', logError)
                    console.log('log-error enable')
                    rl.prompt();
                    break
                case 'debug':
                    client.on('log-debug', logDebug)
                    console.log('log-debug enable')
                    rl.prompt();
                    break
                case 'info':
                    client.on('log-info', logInfo)
                    console.log('log-info enable')
                    rl.prompt();
                    break
                case 'warn':
                    client.on('log-warn', logWarn)
                    console.log('log-warn enable')
                    rl.prompt();
                    break
                default:
                    break
            }
        break
        default:
            break
    }
    rl.prompt();
}).on('close', () => {
    console.log('Bye!');
    process.exit(0);
});