import cookieSet from '@server/socket/components/cookie/set';
import cookieGet from '@server/socket/components/cookie/get';

async function boot(options: options) {
    global.cookie = {
        set: cookieSet,
        get: cookieGet,
    };
}

export default callback(boot);