async function service(socket: SocketIO.Socket, event, message, next, options: options) {
    const $code = options['service'].code;
    const $msg = Tools.isJson(options['service'].msg);
    const $skip = Tools.isNumber($msg.skip);
    const $limit = Tools.isNumber($msg.limit === undefined ? 50 : $msg.limit);
    const tag = Tools.isArray($msg.tag);
    
    try {
        if (true) {
            if ($limit > 0) {
                const $match = {
                    condition: false,
                    filter: {
                        $or: [
                            { tag: { $elemMatch: { $regex: Tools.vector2regex(tag), $options: 'i' } } },
                        ],
                        'flag.hide': false,
                        'flag.delete': false
                    }
                };
                const $project = { 
                    __v: false 
                };
                const query = await mongodb.aggregate('user', [
                    { $skip: $skip },
                    { $limit: $limit },
                    { $match: $match.condition ? $match.filter : {} },
                    { $project: $project }
                ], { database: 'db', errorHandler: error => options['service'].error = error });
                if (query) {
                    await response.attach(query, socket);
                } else {
                    $code(CONFIG['\\status'].notModified);
                    await response.attach(options['service'].error, socket);
                }
            } else {
                await response.attach([], socket);
            }
        } else {
            throw 'Not enough information';
        }
    } catch (error) {
        $code(CONFIG['\\status'].conflict);
        await response.attach(error, socket);
    }
}

export default service;