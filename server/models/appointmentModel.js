const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    description:{
        type:String,
        required:"true"
    },
    createdAt: {
        type: Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});


module.exports = mongoose.model('Appointment', appointmentSchema);//{appointment,complain}