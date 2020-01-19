async function extraction(req, res, next) {
    const router: any = CONFIG['\\router\\http'];
    const servers: any = CONFIG['\\server'].http;
    const cookies: any = CONFIG['\\component\\http'].cookie;

    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
    const host = req.headers.host.split(':')[0];
    const port = Number(req.headers.host.split(':')[1]) || Number(req.connection.server._connectionKey.split(':').pop());
    const unique = `${process.argv[2] || 'server'}:${ip}`; // customizable!
    let controller;
    let params;

    req.url = decodeURIComponent(req.url.replace(/\\/g, '/').replace(/[\/]+/g, '/').replace(/[\/]*$/g, ''));
    for (const server of servers) {
        server.port == port ? req.url = `/${server.name}${req.url}` : null; /* host */
        server.port == port ? controller = server.name : null; /* host */
        server.port == port - 1 ? req.url = `/${server.name}${req.url}` : null; /* localhost */
        server.port == port - 1 ? controller = server.name : null; /* localhost */
    }

    if (!/\/service\/.+/g.test(req.url)) {
        req.url = '/error/404';
        const routes = Object.keys(CONFIG['\\router\\http']);
        const correct = decodeURIComponent(req.originalUrl.replace(/[\/]*$/g, '').replace(/[\/]+/g, '/')).split('?')[0];
        for (let route of routes) {
            const pure = route.replace(/\\/g, '/').replace(/\/+/g, '/').replace(/\/+$/g, '');
            route = route.replace(/^\/[^\/]+/g, '/').replace(/\\/g, '/').replace(/\/+/g, '/').replace(/\/+$/g, '');
            const regex = (new RegExp('^' + route.replace(/\:[a-zA-Z0-9]+/g, '[^\/]+').replace(/\//g, '\\\/') + '$', 'g'));

            if (regex.test(correct)) {
                req.url = router[pure] || '/error/404';
                try {
                    params = npm.routeParams(route, correct) || {};
                } catch (error) {
                    params = {};
                }
                break;
            }
        }
    }

    req.body = { ...npm.camelcaseObjectDeep({ ...req.headers, ...req.body }), _id: (req.body._id || req.headers._id) };
    
    req['_'] = {
        timestamp: new Date(),
        status: CONFIG['\\status'].successful,
        unique: unique, // customizable!
        uid: Tools.isString(req.body.uid || req.query.uid) || undefined,
        token: Tools.isString(req.body.token || req.query.token) || undefined,
        captcha: false,
        controller: controller.toLowerCase(),
        ip: {
            value: ip,
            detection: {
                device: req.clientInfo,
                // details: await npm.nodeIpDetails.initialise({ip: ip}).allInformation()
            }
        },
        route: {
            method: req.method.toLowerCase(),
            protocol: req.protocol.toLowerCase(),
            host: host,
            port: port,
            params: params,
            path: {
                relative: req.url.split('?')[0],
                absolute: `${req.protocol}://${host}:${port}${req.url.split('?')[0]}`,
                original: {
                    pure: decodeURIComponent(req.originalUrl),
                    correct: decodeURIComponent(req.originalUrl.replace(/[\/]*$/g, '').replace(/[\/]+/g, '/'))
                }
            }
        },
        cookie: typeof req.cookies[cookies.name] === 'string' ? req.cookies[cookies.name] : '',
        user: {
            login: false,
            who: {}
        },
        service: {
            discovery: [],
            code: []
        },
        temporary: {
            watchdog: { layer: '/init/**' },
            service: { serve: null }
        },
        flag: {
            response: { attach: false }
        },
        response: [],
        carry: {},
    };

    next();
}

export default extraction;