import discovery from './use/discovery';
import serve from './use/serve';

async function controller(options?: options) {
    const controller = npm.express.Router();
    
    controller.use('/', (req, res, next) => {
        req['_'].temporary.watchdog.layer = '/service/**';
        next();
    });
    controller.use('/', discovery);
    controller.use('/', serve);

    return controller;
}

export default controller;