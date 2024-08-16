const nodemailer  = require("nodemailer")

const emailManager = async (to, subject, text, html) => {
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "9ec5f7b91312bf",
          pass: "22568a9a150152"
        }
    });

    await transport.sendMail({
        from: 'test@gmail.com', 
        to: to, 
        subject: subject,
        text: text,
        html: html,
    });
}

module.exports = emailManager