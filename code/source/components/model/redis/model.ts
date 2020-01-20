const redis = require('redis');
const connections = {};

async function model(database: string) {
    if (CONFIG['\\database'].redis[database]) {
        if (connections[database] && npm.nodeJsonEqual(connections[database].dsn, CONFIG['\\database'].redis[database].dsn)) {
            // ok!
        } else {
            connections[database] = {
                dsn: CONFIG['\\database'].redis[database].dsn,
                connection: redis.createClient(CONFIG['\\database'].redis[database].dsn)
            };
        }
        return connections[database].connection;
    }
}

export default model;