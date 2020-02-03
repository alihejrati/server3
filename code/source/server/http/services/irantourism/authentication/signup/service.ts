import Email from '@source/components/email/send';

async function service(req, res, next, options: options) {
    const $code = options['service'].code;
    const where = Tools.isString(req.body.where);
    const when = Tools.isTimestamp(req.body.when);
    const long = Tools.isNumber(req.body.long);
    const people = Tools.isNumber(req.body.people);
    const sMin = Tools.isNumber(req.body.sMin);
    const sMax = Tools.isNumber(req.body.sMax);
    const currency = Tools.isString(req.body.currency);
    const comment = Tools.isString(req.body.comment);
    const purpose = Tools.isString(req.body.purpose);
    const fName = Tools.isString(req.body.fName);
    const lName = Tools.isString(req.body.lName);
    const country = Tools.isString(req.body.country);
    const city = Tools.isString(req.body.city);
    const education = Tools.isString(req.body.education);
    const birthday = Tools.isTimestamp(req.body.birthday);
    const email = Tools.isEmail(req.body.email);
    const phoneNumber = Tools.isPhoneNumber(req.body.phoneNumber);
    const password = req.body.password ? npm.objectHash(Tools.isString(req.body.password)) : undefined;

    try {
        if ((email && phoneNumber) && password && fName && lName && country && city && education) {
            await new Promise(function (resolve, reject) {
                firebase.admin.auth().createUser({
                    email: email || undefined,
                    phoneNumber: phoneNumber || undefined,
                    password: password,
                })
                    .then(async function (userRecord) {
                        const user = await mongodb.insert('user', {
                            uid: userRecord.uid,
                            account: {
                                charge: 0,
                                email: email || undefined,
                                phoneNumber: phoneNumber || undefined,
                                password: password,
                                birthday: birthday,
                                education: education,
                                city: city,
                                country: country,
                                lName: lName,
                                fName: fName,
                                purpose: purpose,
                                comment: comment,
                                currency: currency,
                                sMax: sMax,
                                sMin: sMin,
                                people: people,
                                long: long,
                                when: when,
                                where: where
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