import model from './model';
import keys from './keys';

async function del(pattern: string, options: options) {
    pattern = pattern.replace(/\:null\:/g, `:${process.argv[2] || 'server'}:`);
    const database = options['database'] || 'db';
    const Model = await model(database);
    const keyss = await keys(pattern) || [];
    const result: any[] = [];
    for (let key of keyss) {
        Model.del(key, (err, reply) => {
            if (!err) {
                result.push(reply);
            }   
        });
    }

    console.log['database']({
        database: {
            type: 'redis',
            database: database
        },
        transaction: {
            type: 'del',
            pattern: pattern
        },
        res: result
    });

    return result;
}

export default callback(del);