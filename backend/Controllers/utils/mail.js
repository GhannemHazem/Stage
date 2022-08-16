const otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer')

let otp = ''
exports.generateOTP = () => {
  const OTP = otpGenerator.generate(10,{specialChars: false });
  return OTP;
};



exports.mailTransport = () =>

            nodemailer.createTransport({
            service: process.env.SERVICE,
            auth:{
                user: process.env.USER,
                pass: process.env.PASS,
            }
        })
    
