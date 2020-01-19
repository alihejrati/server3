import component from './components/boot';

async function boot(options: options) {
    await Promise.all([
        component()
    ]);
}

export default callback(boot);