declare module NodeJS {
    interface Global {
        // source:
        npm: typeof import('@source/bootstrap/helper/npm/packages'),
        mongodb: {
            distinct: typeof import('@source/components/model/mongodb/distinct').default,  
            find: typeof import('@source/components/model/mongodb/find').default,     
            findOneAndUpdate: typeof import('@source/components/model/mongodb/find-one-and-update').default,
            findOne: typeof import('@source/components/model/mongodb/find-one').default,
            insert: typeof import('@source/components/model/mongodb/insert').default,
            insertMany: typeof import('@source/components/model/mongodb/insert-many').default,
            aggregate: typeof import('@source/components/model/mongodb/aggregate').default,
        },
        ObjectId: any,
        redis: {
            del: typeof import('@source/components/model/redis/del').default,  
            get: typeof import('@source/components/model/redis/get').default,  
            keys: typeof import('@source/components/model/redis/keys').default,  
            set: typeof import('@source/components/model/redis/set').default,  
        },
        Tools: typeof import('@source/components/tools/tools').default,
    }
}

declare const npm: typeof import('@source/bootstrap/helper/npm/packages');
declare const mongodb: {
    distinct: typeof import('@source/components/model/mongodb/distinct').default,  
    find: typeof import('@source/components/model/mongodb/find').default,     
    findOneAndUpdate: typeof import('@source/components/model/mongodb/find-one-and-update').default,
    findOne: typeof import('@source/components/model/mongodb/find-one').default,
    insert: typeof import('@source/components/model/mongodb/insert').default,
    insertMany: typeof import('@source/components/model/mongodb/insert-many').default,
    aggregate: typeof import('@source/components/model/mongodb/aggregate').default,
};
declare const ObjectId: any;
declare const redis: {
    del: typeof import('@source/components/model/redis/del').default,  
    get: typeof import('@source/components/model/redis/get').default,  
    keys: typeof import('@source/components/model/redis/keys').default,  
    set: typeof import('@source/components/model/redis/set').default,  
};
declare const Tools: typeof import('@source/components/tools/tools').default;