async function listen() {
    firebase.db.collection('config').onSnapshot((snapshot) => {
        let changedDocs = snapshot.docChanges();
        changedDocs.forEach((change) => {
            // console.log(`[change.type]`, change.type);
            const doc = {
                id: change.doc.id,
                data: {
                    ...change.doc.data()
                }
            }
            CONFIG[doc.id] = doc.data;
            // console.log('---------->', CONFIG, doc.data);
        });
    });
}

async function $firebase() {
    if (process.argv[3]) {
        const admin = require('firebase-admin');
        const serviceAccount = require(`@file/private/configuration/firebase/service-accounts/${process.argv[3]}.json`);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: serviceAccount.databaseURL
        });

        global.firebase = {
            admin: admin,
            db: admin.firestore(),
            serviceAccount: serviceAccount
        };
        listen();
    } else {
        global.firebase = {
            admin: null,
            db: null,
            serviceAccount: null
        };
    }
}

export default $firebase;