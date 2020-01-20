import model from './model';

async function aggregate(collection: string, query, options: options) {
    const errorHandler = options['errorHandler'] || function (error) { }
    const database = options['database'] || 'db';
    const Model = await model(database, collection);
    const document = await new Promise((resolve, reject) => {
        Model.aggregate(query, (error, result) => {
            if (error) {
                errorHandler(error);
                resolve(undefined);
            } else {
                resolve(result);
            }
        });
    });
    let res;
    try {
        res = JSON.parse(JSON.stringify(document));
    } catch (error) {
        res = document || null;
    }

    console.log['database']({
        database: {
            type: 'mongodb',
            database: database,
            collection: collection,
        },
        transaction: {
            type: 'aggregate',
            query: query
        },
        res: res
    });
    return res;
}

export default callback(aggregate);