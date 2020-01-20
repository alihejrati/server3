const mongoose = require('mongoose');
const connections = {};
const models = {};

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

async function model(database: string, collection: string) {
    const modelName = collection;
    if (CONFIG['\\database'].mongodb[database] && CONFIG['@model'].mongodb[`${database}_${collection}`] && CONFIG['@model'].mongodb[`${database}_${collection}`].schema) {
        if (connections[database] && connections[database].client.s.url === CONFIG['\\database'].mongodb[database].dsn) {
            // ok!
        } else {
            if (connections[database]) {
                await connections[database].close();
            }
            connections[database] = mongoose.createConnection(CONFIG['\\database'].mongodb[database].dsn, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        }

        if (models[`${database}_${collection}`] && connections[database].model(modelName).base.connections[1].client.s.url === CONFIG['\\database'].mongodb[database].dsn) {
            // ok!
        } else {
            if (models[`${database}_${collection}`]) {
                connections[database].deleteModel(modelName);
            }
            models[`${database}_${collection}`] = connections[database].model(modelName, new mongoose.Schema(CONFIG['@model'].mongodb[`${database}_${collection}`].schema), (CONFIG['@model'].mongodb[`${database}_${collection}`].collectionName || ''), {
                timestamps: {
                    createdAt: true,
                    updatedAt: true
                }
            });
        }
        return models[`${database}_${collection}`];
    }
}

export default model;