async function send(to: string, subject: string = 'subject', message: string = 'message', code: string = `${npm.randomstring.generate()}${npm.randomstring.generate()}`) {
    const email = CONFIG['\\component'].email;
    const transporter = npm.nodemailer.createTransport({
        service: email.service,
        auth: {
            user: email.user,
            pass: email.pass
        }
    });

    const mailOptions = {
        from: email.from,
        to: to,
        subject: subject,
        text: message
    };

    return await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            mongodb.insert('email', {
                successful: error ? false : true,
                code: code,
                transporter: {
                    service: email.service,
                    auth: {
                        user: email.user,
                        pass: email.pass
                    }
                },
                mailOptions: mailOptions,
                response: {
                    error: error,
                    info: info
                }
            });
            resolve(error ? null : info);
        });
    });
}

export default send;