const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    // socketId: {
    //     type: String,
    //     required: true
    // },q
    conversationHistory: {
        type: Array,
        required: true,
        default: []
    },
    channel:{
        type:String,
        required:true,
            
    },
    createdAt: {
        type: Date,
        default:Date.now
    }
},{
    timestamps:true
});

module.exports = mongoose.model('Conversation', conversationSchema);