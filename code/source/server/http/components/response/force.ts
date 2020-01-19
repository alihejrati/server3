async function force(code: number, req, res, options: options) {
    function resSend(data) {
        mongodb.insert('request', JSON.parse(npm.jsonStringifySafe({response: data, _: req['_']})));
        return res.status(req['_'].status).send(data);
    }
    resSend({
        code: code,
        body: options['body'] || null,
        msg: Object.keys(CONFIG['\\status'])[Object.values(CONFIG['\\status']).indexOf(code)]
    });
}

export default callback(force);