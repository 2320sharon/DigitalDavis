const nodemailer = require("nodemailer");
//const config = require('../config/config');

const transport = nodemailer.createTransport({
    service: "outlook",
    auth: {
        user: "finaliteration@outlook.com",
        pass: "[YkLZMZLW;L2x/m+"
    }
});

const options = {
    from: "finaliteration@outlook.com",
    to: "",
    subject: "Nirvana Password Reset",
    text: "Please copy and paste this link into your web browser to reset your password: "
};

const sendResetPasswordEmail = async (to, token) => {
    options.to = to;
    options.text = "Please copy and paste this link into your web browser to reset your password: http://127.0.0.1:5500/website/hello.html?" + token;
    transport.sendMail(options, function (err, info) {
        if(err){
            console.log(err);
            return;
        }
        console.log(info.response);
    });
};

module.exports = {
    sendResetPasswordEmail,
}
