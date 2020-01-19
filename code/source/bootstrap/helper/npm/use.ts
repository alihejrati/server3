npm.app.use(npm.cors());
npm.app.use(npm.bodyParser.urlencoded({
    extended: false
}));
npm.app.use(npm.bodyParser.json());
npm.app.use(npm.express.static(`${npm.currentDir()}/file/public`));
npm.app.use(npm.expressDevice.capture());
npm.app.use(npm.cookieParser());
npm.app.use(npm.expressip().getIpInfoMiddleware);
// npm.app.use(npm.serveFavicon('favicon.ico'));
npm.app.use(npm.expressNoFavicons());
npm.app.use(npm.ipDeviceParser());
npm.app.use(npm.fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

export default undefined;