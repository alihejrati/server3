async function service(req, res, next, options: options) {
    const $code = options['service'].code;
    const uid = Tools.isString(req['_'].route.params.uid);

    try {
        if (uid) {
            const query = await mongodb.findOneAndUpdate('user', { uid: uid }, {
                'flag.verificationEmail': true
            }, { database: 'db', options: { runValidators: true }, errorHandler: error => options['service'].error = error });
            if (query) {
                await response.attach(null, req, res);
            } else {
                $code(CONFIG['\\status'].notModified);
                await response.attach(options['service'].error, req, res);
            }
        } else {
            throw 'Not enough information';
        }
    } catch (error) {
        $code(CONFIG['\\status'].conflict);
        await response.attach(error, req, res);
    }
}

export default service;