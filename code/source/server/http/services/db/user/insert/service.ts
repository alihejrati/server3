const $config = require('../config.json');

async function service(req, res, next, options: options) {
    const $code = options['service'].code;
    const $database = $config['database'];
    const $collection = $config['collection'];
    const json = {...await crud('mongodb', $database, $collection, req, res), ...{
        createdAt: new Date(),
        updatedAt: new Date(),
        sort: Tools.abs(req.body.sort),
        tag: Tools.isArray(req.body.tag),
        file: {...Tools.isJson(req.body.file)},
        flag: { delete: false, hide: false, ...Tools.isJson(req.body.flag) }
    }};

    try {
        if (true) {
            const query = await mongodb.insert($collection, json, { database: $database, errorHandler: error => options['service'].error = error });
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