async function config() {
    if (process.argv[3]) {
        await new Promise((resolve, reject) => {
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
                // console.log('---------->', CONFIG);
            });
        });
    }
}

export default config;