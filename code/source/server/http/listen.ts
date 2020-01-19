async function listen(options: options) {
    const listners = CONFIG['\\server'].http;

    for (const listner of listners) {
        const host = listner.host === '[ip]' ? await npm.internalIp.v4() : listner.host;

        npm.app.listen(listner.port, host, () => {
            console.log['trace'](`${host}:${listner.port}`);
        });
        npm.app.listen((Number(listner.port)+1).toString(), 'localhost', () => {
            console.log['trace'](`localhost:${(Number(listner.port)+1).toString()}`);
        });
    }
}

export default callback(listen);