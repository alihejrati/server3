async function hell(socket, event, message, next, options: options) {
    socket['_'].timestamp = new Date();
    socket['_'].captcha = false;
    socket['_'].service.discovery = [];
    socket['_'].service.code = [];
    socket['_'].temporary.watchdog.layer = '/disconnect/**';
    socket['_'].temporary.service.serve = null;
    socket['_'].flag.response.attach = false;
    socket['_'].response = [];

    await redis.del(`cookie:null:${socket['_'].cookie}`);
    mongodb.findOneAndUpdate('socket', { socketId: socket['_'].socketId }, {
        state: 'disconnect',
        socketId: socket['_'].socketId, 
        event: event,
        message: message,
        _: socket['_']
    }, { options: { runValidators: true } });
}

export default hell;