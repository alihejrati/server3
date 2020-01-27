async function set(key: string, value, socket, options: options) {
    const jwt = CONFIG['\\npm'].jwt;
    let cookieVAR = await cookie.get(null, socket) || {};

    cookieVAR = Object.assign(cookieVAR, { [`${key}`]: value });
    const cookieObj = {
        unique: socket['_'].unique,
        cookie: cookieVAR
    };
    const encode = npm.jwtSimple.encode(JSON.stringify(cookieObj), jwt.secret);
    const hash = socket['_'].cookie || `${npm.uniqid()}${npm.uniqid()}`;
    if (
        (socket['_'].cookie)
        ||
        (!socket['_'].cookie && !(await redis.get(hash)))
        ) {
        const code = await redis.set(`cookie:null:${hash}`, encode);
        if (code) {
            var date = new Date();
            date.setTime(date.getTime()+(CONFIG['\\component\\socket'].cookie.expire));
            var expires = "; expires="+date['toGMTString']();
            socket.handshake.headers.cookie = CONFIG['\\component\\socket'].cookie.name+"="+hash+expires+"; path=/";
            socket['_'].cookie = hash;
        }        
    }
}

export default set;