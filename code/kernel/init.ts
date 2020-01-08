import { register } from 'ts-module-alias';
import { EventEmitter } from 'events';
import * as currentDir from 'current-dir';
import * as consoleClear from 'console-clear';
import * as loading from 'loading-cli';
import * as color from 'colors-cli';

async function init() {
    consoleClear();
    const load = loading({
        text: color.cyan('loading'),
        color: 'cyan',
        interval: 50,
        stream: process.stdout,
        frames: ['|', '/', '-', '\\']
    }).start();
    
    global.semaphore = new EventEmitter();
    global.CONFIG = {};

    process.argv[2] = process.argv[2] || 'server/http';
    process.argv[3] = process.argv[3] || 'server';

    register({ verbose: false }, currentDir());

    await Promise.all([
        require('@kernel/functions/init').default()
    ]);
    
    load.stop();

    try {
        const app = await (await import(`@source/${process.argv[2]}/app`)).default;
        app();
    } catch (error) {
        console.log['error'](error);
    }
}

init();