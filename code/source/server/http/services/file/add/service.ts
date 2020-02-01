async function service(req, res, next, options: options) {
    const $code = options['service'].code;
    const $dbms = 'mongodb';
    const $database = Tools.isString(req.body.database);
    const $collection = Tools.isString(req.body.collection);
    const _id = Tools.isString(req.body._id);
    const key = Tools.isString(req.body.key);
    const link = Tools.isString(req.body.link);
    const json = {
        [`file.${key}`]: link
    };

    try {
        if (_id && key && link) {
            const query = await mongodb.findOneAndUpdate($collection, { _id: _id }, json, { database: $database, options: { runValidators: true }, errorHandler: error => options['service'].error = error });
            if (query) {
                await response.attach(null, req, res);
            } else {
                $code(CONFIG['\\status'].notModified);
                await response.attach(options['service'].error, req, res);
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