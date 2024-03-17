const nodeMailer=require("nodemailer");
const imaps = require('imap-simple');
const { convert } = require('html-to-text');
const { READ_MAIL_CONFIG } = require('../config/config');
const { simpleParser } = require('mailparser');
const fs = require('fs');
const path = require('path');
const sendEmail=async(options)=>{

    let testAccount=await nodeMailer.createTestAccount();

    //connect with the smtp server
   
    const transporter=nodeMailer.createTransport({
        //service:process.env.SMTP_SERVICE,
        // host:'smtp-relay.brevo.com',
        // port:587,
        // auth:{
        //     user: 'samplemailer2023@gmail.com',
        //     pass: 'KYExFZPpLmQMyzRn'
        // }
        host:'smtp.gmail.com',
        port:587,
        auth:{
            user:'mihir.waba@gmail.com',
            pass: 'dxczsbgiwcrynoir'
        }

    });

    const mailOptions={
        from:"mihir.waba@gmail.com",
        to:options.email,
        subject:options.subject,
        text:options.message,
        
    };

    await transporter.sendMail(mailOptions);

};



module.exports={sendEmail};