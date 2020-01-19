async function set(key: string, value: any, options: options) {
    const model = CONFIG['@model'].redis;
    const jwt = CONFIG['\\npm'].jwt;
    const modelRedisSetConf = CONFIG['\\component'].model.redis;

    key = key.replace(/\:null\:/g, `:${process.argv[2] || 'server'}:`);
    const database = options['database'] || 'db';
    const Model = model[database];
    try {
        JSON.parse(JSON.stringify(value));
        value = JSON.stringify(value);
    } catch (error) {}

    value = value || null;

    const _res = key ? await Model.set(key, npm.jwtSimple.encode(value, jwt.secret), 'EX', modelRedisSetConf.expire) : null;
    const res  = key ? _res || {key: key, value: value} : null;

    console.log['database']({
        database: {
            type: 'redis',
            database: database
        },
        transaction: {
            type: 'set',
            key: key,
            value: value
        },
        res: res
    });

    return res;
}

export default callback(set);