var nodemailer = require("nodemailer");



module.exports.sendVerificationCode = async (email, code) => {
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });
    await transporter.sendMail({
        from: 'Web', // sender address
        to: `${email}`, // list of receivers
        subject: "Verivication Code", // Subject line
        text: code, // plain text body
        html: code, // html body
    });
}