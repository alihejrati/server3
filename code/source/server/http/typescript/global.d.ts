declare module NodeJS {
    interface Global {
        // server/http:
        crud: typeof import('../components/crud/crud').default,
        cookie: {
            set: typeof import('../components/cookie/set').default,
            get: typeof import('../components/cookie/get').default
        },
        response: {
            attach: typeof import('../components/response/attach').default,
            send: typeof import('../components/response/send').default,
            force: typeof import('../components/response/force').default
        },
    }
}

declare const crud: typeof import('../components/crud/crud').default;
declare const cookie: {
    set: typeof import('../components/cookie/set').default,
    get: typeof import('../components/cookie/get').default
};
declare const response: {
    attach: typeof import('../components/response/attach').default,
    send: typeof import('../components/response/send').default,
    force: typeof import('../components/response/force').default
};