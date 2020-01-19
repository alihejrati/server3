async function authentication(req, res, next) {
    const uid = req['_'].uid;
    const token = await cookie.get('token', req, res) || req['_'].token;  

    if (uid) {
        const user = await mongodb.findOne('user', {
            uid: uid
        });
        if (user) {
            req['_'].user.login = true;
            req['_'].user.who = user;
        }
    }

    if (!uid && token) {
        const usr = await redis.get(`auth:null:${npm.objectHash(token)}`);
        if (usr && usr.UID) {
            const user = await mongodb.findOne('user', {
                uid: usr.UID
            });
            if (user) {
                req['_'].user.login = true;
                req['_'].user.who = user;
            }
        }
    }
    next();
}

export default authentication;