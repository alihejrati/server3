declare var global: NodeJS.Global;

declare module NodeJS {
    interface Global {
        // kernel:
        semaphore: import('events').EventEmitter,
        spinners: any,
        firebase: { admin: any, db: any, serviceAccount: any },
        CONFIG: any,
        // sleep: typeof import('@kernel/functions/sleep/sleep').default,
        Import: typeof import('@kernel/functions/Import/Import').default,
        callback: typeof import('@kernel/functions/callback/callback').default,
        jobs: any
    }
}

declare const semaphore: import('events').EventEmitter;
declare const spinners: any;
declare const firebase: { admin: any, db: any, serviceAccount: any };
declare const CONFIG: any;
// declare const sleep: typeof import('@kernel/functions/sleep/sleep').default;
declare const Import: typeof import('@kernel/functions/Import/Import').default;
declare const callback: typeof import('@kernel/functions/callback/callback').default;
declare const jobs: any;