import model from './model/boot';
import tools from './tools/boot';

async function boot(options: options) {
    await Promise.all([
        model(),
        tools(),
    ]);
}

export default callback(boot);