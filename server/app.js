const express=require("express");
const app=express();
const cookieparser=require("cookie-parser");
const{getEmails}=require("./utils/readEmail.js")

const errorMiddleware=require("./middleware/errors");

app.use(express.json());
app.use(cookieparser());

//Importing Routes
const chats=require("./routes/chatsRoutes");
const user=require("./routes/userRoutes");


app.use("/api/v1",chats);
app.use("/api/v1",user)


//MiddleWare
app.use(errorMiddleware);

module.exports=app;