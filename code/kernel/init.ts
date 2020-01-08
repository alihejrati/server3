import { register } from 'ts-module-alias';
import { EventEmitter } from 'events';
import * as currentDir from 'current-dir';
import * as consoleClear from 'console-clear';
import * as color from 'colors-cli';
import * as Spinners from 'terminal-multi-spinners';

async function init() {
    consoleClear();

    global.spinners = new Spinners({ color: 'cyan', spinner: { interval: 80, frames: [color.cyan('|'), color.cyan('/'), color.cyan('-'), color.cyan('\\')] } });
    global.semaphore = new EventEmitter();
    global.CONFIG = {};

    process.argv[2] = process.argv[2] || 'server/http';
    process.argv[3] = process.argv[3] || 'server';

    spinners.add('kernel', { text: 'kernel' });

    register({ verbose: false }, currentDir());

    await Promise.all([
        require('@kernel/functions/init').default()
    ]);

    spinners.succeed('kernel', { text: 'kernel\n' });

    try {
        const app = await (await import(`@source/${process.argv[2]}/app`)).default;
        app();
    } catch (error) {
        console.log['error'](error);
    }
}

init();