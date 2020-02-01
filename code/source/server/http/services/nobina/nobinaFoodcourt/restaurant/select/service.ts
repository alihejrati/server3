const $config = require('../config.json');

async function service(req, res, next, options: options) {
    const $code = options['service'].code;
    const $database = $config['database'];
    const $collection = $config['collection'];
    const $skip = Tools.isSkip(req.body.skip);
    const $limit = Tools.isLimit(req.body.limit);
    const _id = Tools.isObjectid(req.body._id);
    const owner = Tools.isObjectid(req.body.owner);
    const foodcourt = Tools.isObjectid(req.body.foodcourt);
    const tag = Tools.isArray(req.body.tag);

    try {
        if (true) {
            const $match = {
                condition: true,
                filter: {
                    // $or: [
                    //     { tag: { $elemMatch: { $regex: Tools.vector2regex(tag), $options: 'i' } } },
                    // ],
                    'flag.hide': false,
                    'flag.delete': false
                }
            };
            req.body._id ? $match.filter['_id'] = _id : null;
            req.body.owner ? $match.filter['owner'] = owner : null;
            req.body.foodcourt ? $match.filter['foodcourt'] = foodcourt : null;
            const $project = {
                __v: false
            };
            const query = await mongodb.aggregate($collection, [
                { $match: $match.condition ? $match.filter : {} },
                { $project: $project },
                { $skip: $skip },
                { $limit: $limit }
            ], { database: $database, errorHandler: error => options['service'].error = error });
            if (query) {
                await response.attach(query, req, res);
            } else {
                $code(CONFIG['\\status'].notModified);
                await response.attach(options['service'].error, req, res);
            }
        } else {
            throw 'Not enough information';
        }
    } catch (error) {
        $code(CONFIG['\\status'].conflict);
        await response.attach([], req, res);
    }
}

export default service;