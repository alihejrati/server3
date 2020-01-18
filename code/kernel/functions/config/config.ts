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
                console.info(change.doc.id, 'global!');
                // console.info('**********************************')
                // console.log['fatal']((CONFIG['\\database']), '#########', change.type)
                // console.info('**********************************')
            });
        });
        firebase.db.collection('config').doc('\\database').collection('mongodb').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type == 'added') {

                } else if (change.type == 'modified') {

                } else if (change.type == 'removed') {

                }
                // console.info('**********************************')
                // console.log['trace'](change.doc.id, change.doc.data(), change.type)
                // console.info('**********************************')
            });
        });
    }
}

export default config;