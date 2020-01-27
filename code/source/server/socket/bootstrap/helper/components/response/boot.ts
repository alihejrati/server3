import attach from '@server/socket/components/response/attach';
import send from '@server/socket/components/response/send';

async function boot(options: options) {
    global.response = {
        attach: attach,
        send: send,
        force: async () => null 
    };
}

export default callback(boot);