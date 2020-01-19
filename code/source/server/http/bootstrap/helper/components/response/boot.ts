import attach from '@server/http/components/response/attach';
import send from '@server/http/components/response/send';
import force from '@server/http/components/response/force';

async function boot(options: options) {
    global.response = {
        attach: attach,
        send: send,
        force: force
    };
}

export default callback(boot);