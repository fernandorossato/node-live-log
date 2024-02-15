// Server exemple
console.log("Entering loop");

async function run() {
    setInterval(() => {
        console.log('running every 10s')
        // const log = require('node-live-log')('module-10')
        const log = require('../index')('module-10')
        log.warn('Test 10s', 'Arg1', 'Arg2')
    }, 10 * 1000);

    setInterval(() => {
        console.log('running every 15s')
        // const log = require('node-live-log')('module-10')
        const log = require('../index')('module-15')
        log.info('Test 15s')
    }, 15 * 1000);

    await delay(120 * 1000);
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

run()