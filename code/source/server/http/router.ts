async function router(options: options) {
    const controllers: any = [];

    controllers.unshift({
        name: 'init',
        path: '/'
    });
    controllers.push({
        name: 'service',
        path: '/'
    });
    controllers.push({
        name: 'error',
        path: '/'
    });

    for (const controller of controllers) {
        const controllerFunction = await Import(`/code/source/server/http/controllers/${controller.name}/controller.ts`);
        npm.app.use(`${controller.path ? controller.path : '/' + controller.name}`, await controllerFunction.default());
    }
}

export default callback(router);