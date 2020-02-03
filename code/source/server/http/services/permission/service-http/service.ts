async function service(req, res, next, options: options) {
    const $code = options['service'].code;
    const cfg = Tools.isJson(req.body.cfg);
    let key = Tools.isString(req.body.key);

    try {
        if (key) {
            CONFIG['\\service\\http'][key] = {
                enable: Tools.isBoolean(cfg.enable),
                captcha: Tools.isBoolean(cfg.captcha),
                controller: Tools.isArray(cfg.controller),
                method: Tools.isArray(cfg.method),
                role: Tools.isArray(cfg.role),
                plan: Tools.isArray(cfg.plan)
            };
            firebase.db.collection('config').doc('\\service\\http').set(CONFIG['\\service\\http']);
            await response.attach(null, req, res);
        } else {
            throw 'Not enough information.';
        }
    } catch (error) {
        $code(CONFIG['\\status'].conflict);
        await response.attach(error, req, res);
    }
}

export default service;