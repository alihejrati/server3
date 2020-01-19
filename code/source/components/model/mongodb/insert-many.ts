async function insertMany(collection: string, query, options: any) {
    const model = CONFIG['@model'].mongodb;
    const errorHandler = options['errorHandler'] || function (error) {}
    const database = options['database'] || 'db';
    const Model = model[`${database}_${collection}`];
    const documents = await new Promise((resolve, reject) => {
        Model.insertMany(query, { ordered: false }, (error, docs) => {
            if (error) {
                errorHandler(error);
                resolve(undefined);
            } else {
                resolve(docs);
            }
        });
    });

    const res = JSON.parse(JSON.stringify(documents));

    console.log['database']({
        database: {
            type: 'mongodb',
            database: database,
            collection: collection,
        },
        transaction: {
            type: 'insert-many',
            query: query
        },
        res: res
    });
    return res;
}

// export default callback(insertMany);
export default insertMany;