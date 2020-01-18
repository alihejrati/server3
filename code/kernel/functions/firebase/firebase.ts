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
    }
}

export default $firebase;