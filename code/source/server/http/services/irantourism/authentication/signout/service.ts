async function service(req, res, next, options: options) {
    const $code = options['service'].code;
    const token = await cookie.get('token', req, res) || req['_'].token;  

    try {
        if (true) {
            if (req['_'].user.login) {
                const hash = req['_'].cookie;
                await redis.del(`cookie:null:${hash}`);
                await redis.del(`auth:null:${npm.objectHash(token)}`);
                req['_'].user.login = false;
                req['_'].user.who = {};
                await response.attach(null, req, res);
            } else {
                throw 'Authentication required.';
            }
        } else {
            throw 'Not enough information.';
        }
    } catch (error) {
        $code(CONFIG['\\status'].conflict);
        await response.attach(error, req, res);
    }
}

export default service;