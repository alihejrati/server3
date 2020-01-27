async function prerequisite(socket, service, options?: options) {
    const conf = { ...(CONFIG[`\\service\\socket`][`/${service.name}`.replace(/\\/g, '/').replace(/\/+/g, '/').replace(/\/+$/g, '')] || {}) };
    const status = CONFIG['\\status'];
    const serviceIndex = socket['_'].service.discovery.indexOf(service.name);
    socket['_'].service.code[serviceIndex] = status.successful;

    conf.role = Array.isArray(conf.role) ? conf.role : [];
    conf.plan = Array.isArray(conf.plan) ? conf.plan : [];
    conf.captcha = conf.captcha === true;
    conf.enable = conf.enable === false ? false : true;

    if (true) {
        if (conf.captcha) {
            if (socket['_'].captcha) {
                // ok!
            } else {
                socket['_'].service.code[serviceIndex] = status.unprocessableEntity;
                console.log['warn']({
                    tag: 'service/captcha',
                    socket: {
                        _: socket['_']
                    }
                });
                await response.attach(null, socket);
                return 'KILL';
            }
        }
    }

    if (true) {
        if (conf.enable) {
            // ok!
        } else {
            socket['_'].service.code[serviceIndex] = status.unavailableForLegalReasons;
            console.log['warn']({
                tag: 'service/unavailableForLegalReasons',
                socket: {
                    _: socket['_']
                }
            });
            await response.attach(null, socket);
            return 'KILL';
        }
    }

    if (true) {
        if (conf.role.length != 0 || conf.plan.length != 0) {
            if (socket['_'].user.login) {
                let ROLE: boolean = true;
                for (const role of conf.role) {
                    if (typeof role == 'string') {
                        ROLE = ROLE && socket['_'].user.who.role[role];
                    }
                }
                let PLAN: boolean = false;
                for (const plan of conf.plan) {
                    if (typeof plan == 'string') {
                        PLAN = PLAN || socket['_'].user.who.plan[plan];
                    }
                }
                ROLE = conf.role.length == 0 && conf.plan.length != 0 ? false : ROLE;
                if (socket['_'].user.who.role['administrator'] || ROLE || PLAN) {
                    // ok!
                } else {
                    socket['_'].service.code[serviceIndex] = status.forbidden;
                    console.log['warn']({
                        tag: 'service/forbidden',
                        socket: {
                            _: socket['_']
                        }
                    });
                    await response.attach(null, socket);
                    return 'KILL';
                }
            } else {
                socket['_'].service.code[serviceIndex] = status.unauthorized;
                console.log['warn']({
                    tag: 'service/unauthorized',
                    socket: {
                        _: socket['_']
                    }
                });
                await response.attach(null, socket);
                return 'KILL';
            }
        }
    }
}

export default prerequisite;