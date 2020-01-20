import Email from '../../../../../components/email/send';

async function service(req, res, next, options: options) {
    const $code = options['service'].code;
    const email = Tools.isEmail(req.body.email);
    const phoneNumber = Tools.isPhoneNumber(req.body.phoneNumber);
    const username = Tools.isString(req.body.username);
    const displayName = Tools.isString(req.body.displayName);
    const password = req.body.password ? npm.objectHash(Tools.isString(req.body.password)) : undefined;

    try {
        if ((email || phoneNumber) && password) {
            await new Promise(function (resolve, reject) {
                firebase.admin.auth().createUser({
                    email: email || undefined,
                    phoneNumber: phoneNumber || undefined,
                    password: password,
                    username: username,
                    displayName: displayName
                })
                    .then(async function (userRecord) {
                        const user = await mongodb.insert('user', {
                            uid: userRecord.uid,
                            account: {
                                charge: 0,
                                email: email || undefined,
                                phoneNumber: phoneNumber || undefined,
                                password: password,
                                username: username || undefined,
                                displayName: displayName || undefined
                            },
                            'flag.verificationEmail': false,
                            'flag.verificationPhoneNumber': false
                        });
                        if (user) {
                            const link = `http://${CONFIG['\\component'].email.verificationServer.host}:${CONFIG['\\component'].email.verificationServer.port}/verification/email/${user.uid}`;
                            email ? Email(email, 'verification email', link, user._id) : null;
                            await response.attach(null, req, res);
                            resolve();
                        } else {
                            throw 'User not created.';
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