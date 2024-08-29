// Server exemple
const log = require('node-live-log')('module-start')
log.info('Server running')

async function run() {
    setInterval(() => {
        const log = require('node-live-log')('module-10')
        log.debug('Debug Test 10s')
        log.info('info Test 10s')
        log.warn('Warn Test 10s', 'Arg1', { object: 'log-too'})
        log.error('Erro Test 10s')
    }, 10 * 1000);

    setInterval(() => {
        const log = require('node-live-log')('module-10')
        log.info('Test 15s')
    }, 15 * 1000);

    await delay(120 * 1000);
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

run()