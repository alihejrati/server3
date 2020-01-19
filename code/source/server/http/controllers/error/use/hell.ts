async function hell(req, res, next) {
    res.send(req['_']);
}

export default hell;