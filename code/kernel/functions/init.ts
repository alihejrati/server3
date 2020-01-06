import $firebase from '@kernel/functions/firebase/firebase';

async function init() {
    await $firebase();

    const [$config, $logger, $guard, $Import, $callback] = await Promise.all([
        require('@kernel/functions/config/config'),
        require('@kernel/functions/logger/logger'),
        require('@kernel/functions/guard/guard'),
        require('@kernel/functions/Import/Import'),
        require('@kernel/functions/callback/callback'),
    ]);

    await Promise.all([
        $config.default(),
        $logger.default(),
        $guard.default()
    ]);
}

export default init;