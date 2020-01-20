async function service(req, res, next, options: options) {
    const $code = options['service'].code;
    const email = Tools.isEmail(req.body.email);
    const phoneNumber = Tools.isPhoneNumber(req.body.phoneNumber);
    const password = req.body.password ? npm.objectHash(Tools.isString(req.body.password)) : undefined;

    try {
        if ((email || phoneNumber) && password) {
            await new Promise(function (resolve, reject) {
                npm.axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebase.serviceAccount['api-key']}`, {
                    email: email || undefined,
                    phoneNumber: phoneNumber || undefined,
                    password: password
                })
                    .then(async function (Res) {
                        if (!req['_'].user.login) {
                            const Method = 'email-password';
                            const UID = Res.data.localId;
                            const token = npm.objectHash(Res.data.idToken);
                            const user = await mongodb.findOne('user', { uid: UID });
                            if (user) {
                                req['_'].user.login = true;
                                req['_'].user.who = user;
                                await redis.set(`auth:null:${npm.objectHash(token)}`, { _id: user._id, UID: UID, Method: Method });
                                await cookie.set('token', token, req, res);
                                await response.attach({ token: token }, req, res);
                                resolve();
                            } else {
                                throw 'User not found.';
                            }
                        } else {
                            throw 'Already logged in.';
                        }
                    })
                    .catch(async function (error) {
                        reject(error.message || error);
                    });
            });
        } else {
            throw 'Not enough information.';
        }
    } catch (error) {
        $code(CONFIG['\\status'].conflict);
        await response.attach(error, req, res);
    }
}

export default service;