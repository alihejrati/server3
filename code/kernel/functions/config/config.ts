async function config() {
    if (process.argv[3]) {
        await new Promise((resolve, reject) => {
            CONFIG['@model'] = {
                mongodb: {},
                redis: {}
            };
            firebase.db.collection('config').get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        CONFIG[doc.id] = doc.data();
                    });
                    resolve();
                });
        });
        firebase.db.collection('config').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                // console.log(`[change.type]`, change.type);
                CONFIG[change.doc.id] = {
                    ...change.doc.data()
                }
                // console.info('**********************************')
                // console.log['fatal']((CONFIG['\\database']), '#########', change.type)
                // console.info('**********************************')
            });
        });
        firebase.db.collection('config').doc('\\database').collection('mongodb').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type == 'added') {
                    const [database, collection] = change.doc.id.split(':');
                    CONFIG['@model'].mongodb[`${database}_${collection}`] = change.doc.data();
                    if (!npm.directoryExists.sync(`${npm.currentDir()}/code/source/server/http/services/${CONFIG['\\database'].mongodb[database].category}/${database}/${collection}`)) {
                        npm.mkdirp.sync(`${npm.currentDir()}/code/source/server/http/services/${CONFIG['\\database'].mongodb[database].category}/${database}/${collection}`);
                        npm.fs.writeFileSync(`${npm.currentDir()}/code/source/server/http/services/${CONFIG['\\database'].mongodb[database].category}/${database}/${collection}/config.json`, JSON.stringify({
                            dbms: 'mongodb',
                            database: database,
                            collection: collection
                        }));
                        npm.copydir(`${npm.currentDir()}/file/private/database/mongodb`, `${npm.currentDir()}/code/source/server/http/services/${CONFIG['\\database'].mongodb[database].category}/${database}/${collection}`, {
                            utimes: true,
                            mode: true,
                            cover: true
                        }, err => {
                            if (err) {
                                console.log['error'](err);
                            }
                        });
                    }
                } else if (change.type == 'modified') {
                    const [database, collection] = change.doc.id.split(':');
                    CONFIG['@model'].mongodb[`${database}_${collection}`] = change.doc.data();
                    if (!npm.directoryExists.sync(`${npm.currentDir()}/code/source/server/http/services/${CONFIG['\\database'].mongodb[database].category}/${database}/${collection}`)) {
                        npm.mkdirp.sync(`${npm.currentDir()}/code/source/server/http/services/${CONFIG['\\database'].mongodb[database].category}/${database}/${collection}`);
                        npm.fs.writeFileSync(`${npm.currentDir()}/code/source/server/http/services/${CONFIG['\\database'].mongodb[database].category}/${database}/${collection}/config.json`, JSON.stringify({
                            dbms: 'mongodb',
                            database: database,
                            collection: collection
                        }));
                        npm.copydir(`${npm.currentDir()}/file/private/database/mongodb`, `${npm.currentDir()}/code/source/server/http/services/${CONFIG['\\database'].mongodb[database].category}/${database}/${collection}`, {
                            utimes: true,
                            mode: true,
                            cover: true
                        }, err => {
                            if (err) {
                                console.log['error'](err);
                            }
                        });
                    }
                } else if (change.type == 'removed') {
                    const [database, collection] = change.doc.id.split(':');
                    CONFIG['@model'].mongodb[`${database}_${collection}`] = {};
                    npm.deleteDirectory(`${npm.currentDir()}/code/source/server/http/services/${CONFIG['\\database'].mongodb[database].category}/${database}/${collection}`);
                }
            });
        });
    }
}

export default config;