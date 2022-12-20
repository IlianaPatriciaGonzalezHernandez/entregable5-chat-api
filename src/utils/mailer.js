const nodemailer = require('nodemailer')
const config = require('../../config')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 456,
    secure: true,
    auth: {
        user: 'ilyanapgh09@gmail.com',
        pass: config.api.emailPass
    }
})

module.exports = transporter