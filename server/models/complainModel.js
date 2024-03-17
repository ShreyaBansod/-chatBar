const mongoose = require('mongoose');
const complainSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    status: {
        type: String,
        default:"open",
        required: true
    },
    dept: {
        type: String,
        required: true,
        default: ""
    },
    description:{
        type:"String",
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
},{
    timestamps:true
});


module.exports = mongoose.model('Complain', complainSchema);//{appointment,complain}