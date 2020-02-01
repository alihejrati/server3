const $config = require('../config.json');

async function service(req, res, next, options: options) {
    const $code = options['service'].code;
    const $dbms = $config['dbms'];
    const $database = $config['database'];
    const $collection = $config['collection'];
    const _id = Tools.isString(req.body._id);
    const json = {...await crud($dbms, $database, $collection, req, res), ...{
        updatedAt: new Date(),
        sort: Tools.abs(req.body.sort),
        tag: Tools.isArray(req.body.tag),
        file: {...Tools.isJson(req.body.file)},
        flag: { delete: false, hide: false, ...Tools.isJson(req.body.flag) }
    }};

    try {
        if (_id) {
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