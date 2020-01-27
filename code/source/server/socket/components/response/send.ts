async function send(socket, options: options) {
    const message = options['message'];
    const event = options['event'];
    function resSend(data) {
        mongodb.findOneAndUpdate('socket', { socketId: socket['_'].socketId }, {
            state: 'event',
            socketId: socket['_'].socketId, 
            event: event,
            message: message,
            _: socket['_']
        }, { options: { runValidators: true } });
        socket.emit(`/response/${message.head}`.replace(/\\/g, '/').replace(/[\/]+/g, '/').replace(/[\/]*$/g, ''), data);
    }
    function standard(arrayList) {
        let counter = 0;
        const jsonObj = {};
        for (const iterator of arrayList) {
            if (iterator.label) {
                const key = `${iterator.label.split('/').slice(1).join('.')}`;
                delete iterator['label'];
                const value = npm.objectPath.get(jsonObj, key);
                if (value) {
                    if (Array.isArray(value)) {
                        value.push(iterator);
                        npm.objectPath.set(jsonObj, key, value); 
                    } else {
                        npm.objectPath.set(jsonObj, key, [value, iterator]); 
                    }
                } else {
                    npm.objectPath.set(jsonObj, key, iterator); 
                }
            } else {
                jsonObj[counter] = iterator;
                counter++;
            }
        }
        return jsonObj;
    }
    function standardOne(element) {
        delete element['label'];
        return element;
    }
    socket['_'].response.length == 0 ? resSend(null) : socket['_'].response.length == 1 ? resSend(standardOne(socket['_'].response[0])) : resSend(standard(socket['_'].response));
}

export default send;