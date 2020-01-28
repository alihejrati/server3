import model from './model';

async function findOne(collection: string, query, options: options) {
    const errorHandler = options['errorHandler'] || function (error) {}
    const database = options['database'] || 'db';
    const Model = await model(database, collection);
    const res = await new Promise((resolve, reject) => {
        Model.deleteMany(query, error => {
            if (error) {
                errorHandler(error);
                resolve(undefined);
            } else {
                resolve(null);
            }
        });
    });

    console.log['database']({
        database: {
            type: 'mongodb',
            database: database,
            collection: collection,
        },
        transaction: {
            type: 'delete-many',
            query: query
        },
        res: res
    });
    return res;
}

export default callback(findOne);