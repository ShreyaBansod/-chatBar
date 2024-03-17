const Complain=require("./models/complainModel");
const Appointment=require("./models/appointmentModel");
const net = require("net");
const Conversation = require('./models/conversationModel');
const User = require("./models/userModel");
const Message = require("./models/messages");
const jwt = require("jsonwebtoken");

function isJSON(str) {
    try {
        return JSON.parse(str) && !!str;
    } catch (e) {
        return false;
    }
}

const isLoggedIn = async (socket, next) => {
    const token = socket.handshake.headers.access_token;
    if (!token) {
        console.log("Login required");
        return;
    }
    //get the user id and conversation id
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    //set the conversation id in this
    socket.user = await User.findById(decodedData.id);
    next();
};

const HOST = "0.tcp.in.ngrok.io";
const PORT = 10731;
const client = new net.Socket();
    

module.exports = function (chat) {

    chat.use(isLoggedIn);

    chat.on('connection', socket => {
        console.log('User connected');

        // Handle received messages from the user
        socket.on('message', async (message) => {
            console.log('Message from user:', message);
            let conversationHistory = [];
            //check if previous conversation related to id exists
            //if it does then update the conversationhistory and append
            //intead of user id select conversation id and even change that in schema
        const existingConversation = await Conversation.findOne({ user_id: socket.user });
    
    
        if (existingConversation) {
        conversationHistory = existingConversation.conversationHistory;// Get existing history         
        }
    
        const newMessageUser=new Message({
          role:"user",
          content:message
        })
    
         await newMessageUser.save()
         console.log(newMessageUser)
         conversationHistory.push(newMessageUser);
         if(!existingConversation){
          const newConversation = new Conversation({
            //user id-->convo id
            user_id:socket.user,
            //socketId: socket.id,
            channel:"chatbot",
            conversationHistory: conversationHistory
          });
          await newConversation.save();
    
        }else{
          existingConversation.conversationHistory = conversationHistory;
          await existingConversation.save();
        }     
    

            // Send the message to the TCP server
            client.write(message);
        });

        // Event handler for disconnect
        socket.on('disconnect', () => {
            client.end();
            console.log('User disconnected');
        });

        // TCP client event handler for receiving data from the server
        client.connect(PORT, HOST, function () {
            console.log("Connected to TCP server");
        });

        client.on("data", async (data) => {
            // Access the 'socket' object here
            console.log(socket.user);
            // if (!socket.user) {
            //   console.log("User not authenticated");
            //   return;
            // }
          
            let conversationHistory = [];
                  //check if previous conversation related to id exists
                  //if it does then update the conversationhistory and append
                  //intead of user id select conversation id and even change that in schema
            const existingConversation = await Conversation.findOne({ user_id: socket.user } );
          
          
            if (existingConversation) {
              conversationHistory = existingConversation.conversationHistory;// Get existing history         
            }
          
          
            console.log("Received message from server:", data.toString());
            response=data.toString()
          
            chat.emit('tcp_message', response);
          
            const newMessageAsst=new Message({
              role:"assistant",
              content:response
            })
          
            await newMessageAsst.save()
            conversationHistory.push(newMessageAsst);
          
            if(!existingConversation){
              const newConversation = new Conversation({
                //user id-->convo id
                user_id:socket.user,
                //socketId: socket.id,
                channel:"chatbot",
                conversationHistory: conversationHistory
              });
          
              await newConversation.save();
              //existingConversation=newConversation
          
            }else{
              existingConversation.conversationHistory = conversationHistory;
              await existingConversation.save();
            }
          
          //   if(isJSON(response)){
          //     const res=JSON.parse(response)
          //     if(res.intent==="schedule"){
          //       //res.conversation_id=existingConversation.id
          //       const newAppointment= new Appointment({
          //        user_id:existingConversation.user_id,
          //        date: res.date,
          //        time: res.time,
          //        description:res.description
          //      });
          //      await newAppointment.save();
          //      //update response
          //      //  ScheduleAppointment(res,callback)
          //     } else if(res.intent==="complain"){
          //       //res.user_id=existingConversation.user_id
          //       const newComplain= new Complain({
          //        user_id: existingConversation.user_id,
          //        dept:res.dept,
          //        description:res.description
          //      });
          //      await newComplain.save();
          //      //update response
          //     }
          //  }
            // Your logic for handling data from the TCP server goes here
        });

        client.on("close", function () {
            console.log("Connection closed");
        });

    });

};
