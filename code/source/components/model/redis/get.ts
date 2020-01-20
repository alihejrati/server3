import model from './model';

async function get(key: string, options: options) {
    const jwt = CONFIG['\\npm'].jwt;
    key = key.replace(/\:null\:/g, `:${process.argv[2] || 'server'}:`);
    const database = options['database'] || 'db';
    const Model = await model(database);
    const value = await new Promise((resolve, reject) => {
        Model.get(key, (err, reply) => {
            try {
                reply = npm.jwtSimple.decode(reply, jwt.secret);
            } catch (error) {
                reply = null;
            }
            if (!err) {
                try {
                    reply = JSON.parse(reply);
                    resolve(reply);
                } catch (error) {
                    resolve(reply);
                }
            }
        });
    });

    console.log['database']({
        database: {
            type: 'redis',
            database: database
        },
        transaction: {
            type: 'get',
            key: key
        },
        res: value
    });

    return value;
}

export default callback(get);