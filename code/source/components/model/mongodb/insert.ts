import model from './model';

async function insert(collection: string, query, options: options) {
    const errorHandler = options['errorHandler'] || function (error) { }
    const database = options['database'] || 'db';
    const Model = await model(database, collection);
    const document = await new Promise((resolve, reject) => {
        new Model(query).save((error, doc) => {
            if (error) {
                errorHandler(error);
                resolve(undefined);
            }
            resolve(doc);
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
            type: 'insert',
            query: query
        },
        res: res
    });
    return res;
}

export default callback(insert);