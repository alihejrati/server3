async function config() {
    if (process.argv[3]) {
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