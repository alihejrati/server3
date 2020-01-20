import model from './model';

async function keys(pattern: string, options: options) {
    pattern = pattern.replace(/\:null\:/g, `:${process.argv[2] || 'server'}:`);
    const database = options['database'] || 'db';
    const Model = await model(database);
    const value = await new Promise<any>((resolve, reject) => {
        Model.keys(pattern, (err, reply) => {
            if (!err) {
                resolve(reply);
            }
        });
    }); 

    console.log['database']({
        database: {
            type: 'redis',
            database: database
        },
        transaction: {
            type: 'keys',
            pattern: pattern
        },
        res: value.length == 0 ? null : value
    });

    return value.length == 0 ? null : value;
}

export default callback(keys);