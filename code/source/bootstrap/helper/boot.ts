import npm from './npm/boot';
import component from './components/boot';

async function boot(options: options) {
    await Promise.all([
        npm(),
        component()
    ]);
}

export default callback(boot);