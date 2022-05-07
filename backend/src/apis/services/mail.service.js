const nodemailer = require("nodemailer");

const sendMail = async (data) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "tranhuynguyen.devplus@gmail.com",
            pass: "Huynbt@209"
        },
        port: 465,
        secure: true,
        tls: {
            rejectUnauthorized: false
        }
    });

    const contentType = {
        from: 'user',
        ...data
    }

    await transporter.sendMail(contentType, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}

module.exports = {
    sendMail
}