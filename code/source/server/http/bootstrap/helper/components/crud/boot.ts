import crud from '@server/http/components/crud/crud';

async function boot(options: options) {
    global.crud = crud;
}

export default callback(boot);