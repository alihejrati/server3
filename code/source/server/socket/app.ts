import BOOT from '@source/bootstrap/boot';
import boot from '@server/socket/bootstrap/boot';

async function app(options: options) {
    await Promise.all([
        BOOT(),
        boot()
    ]);
    const [connection, listen] = await Promise.all([
        import('./connection'),
        import('./listen')
    ]);
    await connection.default();
    await listen.default();
}

export default callback(app);