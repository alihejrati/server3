import distinct from '@source/components/model/mongodb/distinct';
import deleteMany from '@source/components/model/mongodb/delete-many';
import find from '@source/components/model/mongodb/find';
import findOneAndUpdate from '@source/components/model/mongodb/find-one-and-update';
import findOne from '@source/components/model/mongodb/find-one';
import insert from '@source/components/model/mongodb/insert';
import insertMany from '@source/components/model/mongodb/insert-many';
import aggregate from '@source/components/model/mongodb/aggregate';

import del from '@source/components/model/redis/del';
import get from '@source/components/model/redis/get';
import keys from '@source/components/model/redis/keys';
import set from '@source/components/model/redis/set';

async function boot(options: options) {
    global.mongodb = {
        distinct: distinct,  
        deleteMany: deleteMany,
        find: find,     
        findOneAndUpdate: findOneAndUpdate,
        findOne: findOne,
        insert: insert,
        insertMany: insertMany,
        aggregate: aggregate
    };    
    global.ObjectId = npm.mongoose.Types.ObjectId;
    global.redis = {
        del: del,
        get: get,
        keys: keys,
        set: set
    };
}

export default callback(boot);