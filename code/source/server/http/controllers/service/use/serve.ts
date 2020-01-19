import prerequisite from '../../../services/_/prerequisite';

async function serve(req, res, next) {
    const discovery = req['_'].service.discovery;
    const status = CONFIG['\\status'];
    
    for (const service of discovery) {
        req['_'].temporary.service.serve = service;

        const file = await Import(`/code/source/server/http/services/${service}/service.ts`);
        const flag = file ? true : false;
        if (flag && process.argv[3] && CONFIG['\\service\\http'][service] === undefined) {
            CONFIG['\\service\\http'][service] = {
                enable: true,
                captcha: false,
                controller: ['*'],
                method: ['get', 'post', 'put', 'delete'],
                role: [],
                plan: ['development']
            };
            firebase.db.collection('config').doc('\\service\\http').set(CONFIG['\\service\\http']);
        }
        const serviceModule = file || {
            default: async function (req, res, next) {
                const serviceIndex = req['_'].service.discovery.indexOf(service);
                req['_'].service.code[serviceIndex] = status.serviceUnavailable;
                console.log['warn']({
                    tag: 'service/unavailable',
                    req: {
                        _: req['_']
                    }
                });
                await response.attach(null, req, res);
            }
        };
        const opt = {
            service: {
                name: service,
                code: code => req['_'].service.code[req['_'].service.discovery.indexOf(service)] = code,
                status: CONFIG['\\status'],
                error: null
            }
        };
        
        const KILL = flag ? await prerequisite(req, res, opt.service) : null
        if (KILL !== 'KILL') {
            await serviceModule.default(req, res, next, opt);
        }
    }
    req['_'].temporary.service.serve = null;
    req['_'].flag.response.attach ? await response.send(req, res) : next();
}

export default serve;