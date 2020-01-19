import cookieSet from '@server/http/components/cookie/set';
import cookieGet from '@server/http/components/cookie/get';

async function boot(options: options) {
    global.cookie = {
        set: cookieSet,
        get: cookieGet,
    };
}

export default callback(boot);