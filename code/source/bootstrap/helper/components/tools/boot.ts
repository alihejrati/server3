import Tools from '@source/components/tools/tools';

async function boot(options: options) {
    global.Tools = Tools;
}

export default callback(boot);