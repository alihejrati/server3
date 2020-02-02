import * as $config from '../config.json';

async function service(req, res, next, options: options) {
    const $code = options['service'].code;
    const $database = $config['database'];
    const $collection = $config['collection'];
    const _id = Tools.isString(req.body._id);

    try {
        if (_id) {
            const query = await mongodb.findOneAndUpdate($collection, { _id: _id }, {
                'flag.delete': true
            }, { database: $database, options: { runValidators: true }, errorHandler: error => options['service'].error = error });
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