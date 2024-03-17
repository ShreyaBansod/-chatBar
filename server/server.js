const express = require('express');
const dotenv=require("dotenv").config();  //configuring 
const socket = require("socket.io");
const { sendEmail, readMailRecieved} = require('./utils/sendEmail');
const{getEmails}=require("./utils/readEmail.js")
const connectDB=require("./config/dbConnection");//IMPORT DB
const app=require("./app");

//Handling Uncaught Exception
 process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
});

//Connecting DB
connectDB();
// const bootstrap = async () => {
//   setTimeout(async () => {
//     console.log('Fetching the newly send mail', new Date().toString());
//     await readMailRecieved();
//   }, 10000);
// };

// const bootstrap = async () => {
//   setTimeout(async () => {
//     console.log('Fetching the newly send mail', new Date().toString());
//     await getEmails("shreyabansod2013@gmail.com");
//   }, 10000);
// };


//setting up server
const server=app.listen(process.env.PORT,()=>{
    console.log(`Server working on http://localhost:${process.env.PORT}`);
});


// bootstrap()
//calling the function every 10 seconds
//setInterval(bootstrap, 10000)


//setting up socketio api
const io = socket(server);
const chat = io.of('/chat');

require("./socket.js")(chat);
