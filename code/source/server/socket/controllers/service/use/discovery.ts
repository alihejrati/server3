async function discovery(socket, event, message, next, options: options) {
    socket['_'].timestamp = new Date();
    socket['_'].captcha = false;
    socket['_'].service.discovery = [];
    socket['_'].service.code = [];
    socket['_'].temporary.watchdog.layer = '/service/**';
    socket['_'].temporary.service.serve = null;
    socket['_'].flag.response.attach = false;
    socket['_'].response = [];
    socket['_'].cookie = typeof npm.cookie.parse(socket.handshake.headers.cookie || '')[CONFIG['\\component\\socket'].cookie.name] === 'string' ? npm.cookie.parse(socket.handshake.headers.cookie || '')[CONFIG['\\component\\socket'].cookie.name] : '',
    socket['_'].user = {login: false, who: {}};

    const msg = message.tail[message.tail.length - 1];
    const token = await cookie.get('token', socket) || msg.token;  

    if (token) {
        const usr = await redis.get(`auth:server/http:${npm.objectHash(token)}`);
        if (usr && usr._id) {
            const user = await mongodb.findOne('user', {
                _id: usr._id
            });
            if (user) {
                socket['_'].user.login = true;
                socket['_'].user.who = user;
                await cookie.set('token', token, socket);
            }
        }
    }
    
    const services: string[] = message.head.replace(/^.*\/service\//g, '').split(':');
    const discovery: string[] = [];
    for (let index = 0; index < services.length; index++) {
        services[index] = services[index].replace(/[\:]+/g, ':').replace(/[\.]+/g, '/').replace(/[\/]*$/g, '').replace(/[\/]+/g, '/').trim();
        services[index] = services[index][0] != '/' ? `/${services[index]}` : services[index];
        services[index] == '' || services[index] == '/' ? null : discovery.push(services[index]);
    }
    socket['_'].service.discovery = discovery;
    
    next();
}

export default discovery;