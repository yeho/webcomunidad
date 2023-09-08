import nodemailer from 'nodemailer'

const mail = nodemailer.createTransport({
  host: 'smtp.ionos.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export default mail
