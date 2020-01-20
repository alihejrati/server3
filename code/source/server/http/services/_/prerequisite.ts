async function prerequisite(req, res, service, options?: options) {
    const conf = { ...(CONFIG[`\\service\\http`][`/${service.name}`.replace(/\\/g, '/').replace(/\/+/g, '/').replace(/\/+$/g, '')] || {}) };
    const status = CONFIG['\\status'];
    const serviceIndex = req['_'].service.discovery.indexOf(service.name);
    req['_'].service.code[serviceIndex] = status.successful;

    conf.method = Array.isArray(conf.method) ? conf.method : ['*'];
    conf.role = Array.isArray(conf.role) ? conf.role : [];
    conf.plan = Array.isArray(conf.plan) ? conf.plan : [];
    conf.controller = Array.isArray(conf.controller) ? conf.controller : ['*'];
    conf.captcha = conf.captcha === true;
    conf.enable = conf.enable === false ? false : true;

    if (true) {
        for (let index = 0; index < conf.controller.length; index++) {
            conf.controller[index] = conf.controller[index].toLowerCase();
        }
        if (conf.controller.indexOf(req['_'].controller) >= 0 || conf.controller.indexOf('*') >= 0) {
            // ok!
        } else {
            req['_'].service.code[serviceIndex] = status.badRequest;
            console.log['warn']({
                tag: 'service/badRequest',
                req: {
                    _: req['_']
                }
            });
            await response.attach(null, req, res);
            return 'KILL';
        }
    }

    if (true) {
        for (let index = 0; index < conf.method.length; index++) {
            conf.method[index] = conf.method[index].toLowerCase()
        }
        if (conf.method.indexOf(req['_'].route.method) >= 0 || conf.method.indexOf('*') >= 0) {
            // ok!
        } else {
            req['_'].service.code[serviceIndex] = status.methodNotAllowed;
            console.log['warn']({
                tag: 'service/methodNotAllowed',
                req: {
                    _: req['_']
                }
            });
            await response.attach(null, req, res);
            return 'KILL';
        }
    }

    if (true) {
        if (conf.captcha) {
            if (req['_'].captcha) {
                // ok!
            } else {
                req['_'].service.code[serviceIndex] = status.unprocessableEntity;
                console.log['warn']({
                    tag: 'service/captcha',
                    req: {
                        _: req['_']
                    }
                });
                await response.attach(null, req, res);
                return 'KILL';
            }
        }
    }

    if (true) {
        if (conf.enable) {
            // ok!
        } else {
            req['_'].service.code[serviceIndex] = status.unavailableForLegalReasons;
            console.log['warn']({
                tag: 'service/unavailableForLegalReasons',
                req: {
                    _: req['_']
                }
            });
            await response.attach(null, req, res);
            return 'KILL';
        }
    }

    if (true) {
        if (conf.role.length != 0 || conf.plan.length != 0) {
            if (req['_'].user.login) {
                let ROLE: boolean = true;
                for (const role of conf.role) {
                    if (typeof role == 'string') {
                        ROLE = ROLE && req['_'].user.who.role[role];
                    }
                }
                let PLAN: boolean = false;
                for (const plan of conf.plan) {
                    if (typeof plan == 'string') {
                        PLAN = PLAN || req['_'].user.who.plan[plan];
                    }
                }
                ROLE = conf.role.length == 0 && conf.plan.length != 0 ? false : ROLE;
                if (req['_'].user.who.role['administrator'] || ROLE || PLAN) {
                    // ok!
                } else {
                    req['_'].service.code[serviceIndex] = status.forbidden;
                    console.log['warn']({
                        tag: 'service/forbidden',
                        req: {
                            _: req['_']
                        }
                    });
                    await response.attach(null, req, res);
                    return 'KILL';
                }
            } else {
                req['_'].service.code[serviceIndex] = status.unauthorized;
                console.log['warn']({
                    tag: 'service/unauthorized',
                    req: {
                        _: req['_']
                    }
                });
                await response.attach(null, req, res);
                return 'KILL';
            }
        }
    }
}

export default prerequisite;