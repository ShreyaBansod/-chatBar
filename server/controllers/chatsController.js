//const  Books=require("../models/booksModel");
const User = require('../models/userModel');
const asyncHandler=require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const jwt=require("jsonwebtoken");
const conversationModel = require("../models/conversationModel");
const appointmentModel = require('../models/appointmentModel');
const complainModel = require('../models/complainModel');

const getChats=asyncHandler(async(req,res)=>{

  const conversations=await conversationModel.find({user_id:req.user.id});
  res.status(200).json({
      conversations
  });


});


const ScheduleAppointment=asyncHandler(async(req,res)=>{
  const { date, time, description } = req.body;
  console.log(typeof(req.body.date))
  const appointment=await appointmentModel.create({
    user_id:req.user.id,
    date: date,
    time: time,
    description:description   
  });
  await appointment.save();
  res.status(201).json({
    success:true,
    appointment
  });

})


const RaiseComplain=asyncHandler(async(req,res)=>{
  const complain=await complainModel.create({
    user_id:req.user.id,
    dept:req.dept,
    description:req.description
  });
  await complain.save();
  res.status(201).json({
    success:true,
    complain
  });

})


module.exports={getChats,RaiseComplain,ScheduleAppointment};