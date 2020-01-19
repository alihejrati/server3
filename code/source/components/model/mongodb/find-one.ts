async function findOne(collection: string, query, options: options) {
    const model = CONFIG['@model'].mongodb;
    const errorHandler = options['errorHandler'] || function (error) {}
    const database = options['database'] || 'db';
    const Model = model[`${database}_${collection}`];
    const sort = options['sort'] || {};
    const select = options['select'] || {};
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
    const document = await Model.findOne(query).sort(sort).select(select);
    const res = JSON.parse(JSON.stringify(document));

    console.log['database']({
        database: {
            type: 'mongodb',
            database: database,
            collection: collection,
        },
        transaction: {
            type: 'find-one',
            query: query,
            sort: sort
        },
        res: res
    });
    return res;
}

export default callback(findOne);