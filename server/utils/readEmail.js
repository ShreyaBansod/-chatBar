const Imap = require('imap');
const {simpleParser} = require('mailparser');
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const conversationModel = require('../models/conversationModel');
const Message=require("../models/messages")

const imapConfig = {
  user: process.env.EMAIL_HOST,
  password: process.env.EMAIL_PASSWORD,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
  connTimeout: 100000, 
};

const getEmails = (user_email) => {
    let arr=[]
    try {
        const imap = new Imap(imapConfig);
        imap.once('ready', () => {
          imap.openBox('INBOX', false, () => {
            imap.search(['UNSEEN',['FROM', user_email]], (err, results) => {
              const f = imap.fetch(results, {bodies: ''});
              f.on('message', msg => {
                msg.on('body', stream => {
                  simpleParser(stream, async (err, parsed) => {
                    // const {from, subject, textAsHtml, text} = parsed;
                    const {from, subject, textAsHtml, text, attachments} = parsed; 
                    //console.log(attachments)
                    console.log(`from:${from}`)
                    console.log(`subject:${subject}`)
                    console.log(`text:${text}`)

                    

                    const newMessageAsst=new Message({
                        role:"assistant",
                        content:text
                      })
              
                    await newMessageAsst.save()
                    console.log(newMessageAsst)
                    
                    arr.push(newMessageAsst)
                    console.log(arr)
                    const newConversation= new conversationModel({
                        user_id:'65f206624655dbfb35238613',
                        channel:"email",
                        conservationHistory:arr,
                      });
                     await newConversation.save();
                    console.log(newConversation)
                   
                    for (const attachment of attachments) {
                        const { filename, content } = attachment;
                        if (filename && content) {
                          console.log(content)
                          // Decode attachment content from base64
                          const decodedContent = Buffer.from(content, 'base64').toString('utf-8');
                          
                          //console.log(decodedContent)
                          // Save attachment content to a file
                        //   const ext = path.extname(filename); // Get file extension
                        //   const nameWithoutExt = path.basename(filename, ext); // Get filename without extension
                        //   console.log(nameWithoutExt)
                        //   const attachmentFilename = `${filename}`;
                          
                        //   fs.writeFile(attachmentFilename, decodedContent, (writeErr) => {
                        //     if (writeErr) {
                        //       console.error('Error saving decoded attachment:', writeErr);
                        //     } else {
                        //       console.log(`Decoded attachment saved as ${attachmentFilename}`);
                        //     }

                        // });
                     }
                    }
                  });
                });
             
              });
              f.once('error', ex => {
                return Promise.reject(ex);
              });
              f.once('end', () => {
                console.log('Done fetching all messages!');
                imap.end();
              });
            });
          });
        });
      
  
      imap.once('error', err => {
        console.error('IMAP error:', err);
      });
  
      imap.once('end', () => {
        console.log('Connection ended');
      });
  
      imap.connect();
    } catch (ex) {
      console.error('An error occurred:', ex);
    }
  };

module.exports={getEmails}