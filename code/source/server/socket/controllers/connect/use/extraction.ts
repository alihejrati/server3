async function extraction(socket: SocketIO.Socket, event, message, next, options: options) {
    const ip = socket.request.connection.remoteAddress;
    const socketId = socket.id;
    const unique = `${process.argv[2] || 'server'}:${ip}`; // customizable!
    const cookies: any = CONFIG['\\component\\socket'].cookie;    

    socket['_'] = {
        timestamp: new Date(),
        status: CONFIG['\\status'].successful,
        socketId: socketId.toString(),
        unique: unique, // customizable!
        captcha: false,
        ip: {
            value: ip,
            detection: {
                details: undefined // Promise
            }
        },
        cookie: typeof npm.cookie.parse(socket.handshake.headers.cookie || '')[cookies.name] === 'string' ? npm.cookie.parse(socket.handshake.headers.cookie || '')[cookies.name] : '',
        user: {
            login: false,
            who: {}
        },
        service: {
            discovery: [],
            code: []
        },
        temporary: {
            watchdog: {layer: '/connect/**'},
            service: {serve: null}
        },
        flag: {
            response: {attach: false}
        },
        response: []
    };

    npm.nodeIpDetails.initialise({ip: ip}).allInformation().then(details => {
        socket['_'].ip.detection.details = details;
        mongodb.insert('socket', {
            state: 'connect',
            socketId: socket['_'].socketId, 
            event: event,
            message: message,
            _: socket['_']
        });
    });
}

export default extraction;