async function find(collection: string, query, options: options) {
    const model = CONFIG['@model'].mongodb;
    const errorHandler = options['errorHandler'] || function (error) {}
    const database = options['database'] || 'db';
    const Model = model[`${database}_${collection}`];
    const select = options['select'] || {};
    const limit = options['limit'] || null;
    const skip = options['skip'] || null;
    const sort = options['sort'] || {};

    if (!options['default_mode']) {
        if (query['$or']) {
            for (let index = 0; index < query['$or'].length; index++) {
                query['$or'][index]['flag.hide'] = false;
                query['$or'][index]['flag.delete'] = false;
            }
        } else {
            query['flag.hide'] = false;
            query['flag.delete'] = false;
        }
    }

    const documents = await Model
    .find(query)
    .select(select)
    .limit(limit)
    .skip(skip)
    .sort(sort)
    .exec();
    const res = documents.length == 0 ? null : JSON.parse(JSON.stringify(documents));

    console.log['database']({
        database: {
            type: 'mongodb',
            database: database,
            collection: collection,
        },
        transaction: {
            type: 'find',
            query: query,
            select: select,
            limit: limit,
            skip: skip,
            sort: sort
        },
        res: res
    });
    return res;
}

export default callback(find);