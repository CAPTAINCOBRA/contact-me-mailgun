const nodemailer = require("nodemailer");
const mailgun = require("nodemailer-mailgun-transport");
const log = console.log;
require("dotenv").config();

const auth = {
  auth: {
    api_key: process.env.API_KEY,
    domain: process.env.DOMAIN,
  },
};

const transporter = nodemailer.createTransport(mailgun(auth));

const sendMail = (email, subject, text, cb) => {
  const mailOptions = {
    from: email,
    to: process.env.TO,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      //   log("'Error occurs");
      cb(err, null);
    } else {
      //   log("Message Sent!");
      cb(null, data);
    }
  });
};

//Used cb in order to use function like sendMail('','','',function(err, data){
//
// })

module.exports = sendMail;
