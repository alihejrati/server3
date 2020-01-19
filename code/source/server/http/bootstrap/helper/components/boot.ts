import crud from './crud/boot';
import cookie from './cookie/boot';
import response from './response/boot';

async function boot(options: options) {
    await Promise.all([
        crud(),
        cookie(),
        response()
    ]);
}

export default callback(boot);