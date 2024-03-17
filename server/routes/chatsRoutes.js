const express=require("express");
const router=express.Router();
const {getChats,RaiseComplain,ScheduleAppointment}=require("../controllers/chatsController");
const {isAuthenticatedUser}=require("../middleware/auth");

router.route("/").get((req,res)=>{
    res.status(200).json({
        "Success":true
    });
})
router.route("/get-chats").get(getChats);
router.route("/raise-complain").post(isAuthenticatedUser,RaiseComplain);
router.route("/book-appointment").post(isAuthenticatedUser,ScheduleAppointment);


module.exports=router;