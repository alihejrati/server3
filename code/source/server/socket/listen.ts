async function listen(options: options) {
    const socket = CONFIG['\\server'].socket;
    socket.host = socket.host === '[ip]' ? await npm.internalIp.v4() : socket.host;
    npm.server = npm.server(handler).listen(socket.port, socket.host, () => {
        console.log['trace'](`${socket.host}:${socket.port}`);
    });

    function handler(req, res) {
        res.writeHead(200);
        res.end(`
            <html>
                <head>
                    <title>Socket io client</title>
                    <script src="http://${socket.host}:${socket.port}/socket.io/socket.io.js"></script>
                    <script>
                        var socket = io("http://${socket.host}:${socket.port}");
                    </script>
                </head>
                <body>
                </body>
            </html>
        `);
    }
    semaphore.emit('/server/socket/ready');
}   

export default callback(listen);