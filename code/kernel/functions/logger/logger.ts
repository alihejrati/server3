const log4js = require('log4js').getLogger();
let map = {};
let collectionLog;

async function purelog(level: string, sublevel: string, ...parameters) {
    const obj = {
        app: process.argv[2],
        firebase: process.argv[3],
        createdAt: new Date(),
        level: level,
        sublevel: sublevel,
        parameters: parameters
    };

    try {
        log4js.level = level;
        log4js[level](obj);
    } catch (error) {
        log4js.level = 'trace';
        log4js['trace'](obj);
    } finally {
        // collectionLog.doc().set(obj);
    }
}

async function log(level: string, ...parameters) {
    if (/^kernel\/[A-Za-z0-9]+$/g.test(level)) {
        let LEVEL = 'trace';
        try {
            LEVEL = parameters[0]['level'];
        } catch (error) {
            LEVEL = 'trace';
        }
        purelog(LEVEL, level, ...parameters);
    } else {
        purelog(map[level] || level, level, ...parameters);
    }
}

async function logger() {
    const handler = {
        get: (obj, level) => {
            return (...parameters) => {
                return log(level, ...parameters);
            }
        },
    };

    if (process.argv[3]) {
        collectionLog = firebase.db.collection('log');
        console.log = new Proxy((...parameters) => {
            log('debug', ...parameters);
        }, handler);
    }
}

export default logger;