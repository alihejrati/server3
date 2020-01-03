import { register } from 'ts-module-alias';
import { EventEmitter } from 'events';
import * as currentDir from 'current-dir';

async function init() {
    global.semaphore = new EventEmitter();
    global.CONFIG = {};

    process.argv[2] = process.argv[2] || 'server/http';
    process.argv[3] = process.argv[3] || 'server';

    register({ verbose: false }, currentDir());

    await Promise.all([
        require('@kernel/functions/init').default()
    ]);

    // try {
    //     const app = await (await import(`../source/${process.argv[2]}/app`)).default;
    //     app();
    // } catch (error) {
    //     console.error(error);
    // }

    console.debug('------------------>', process.argv[2], process.argv[3]);
}

init();