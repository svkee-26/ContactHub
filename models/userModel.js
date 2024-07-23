const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add the username "],
    },
    email:{
        type:String,
        required:[true,"Please add the email address"],
        unique:[true,"email address already taken"],
    },
    password:{
        type:String,
        required:[true,"Please add the user password"],
    },

},{
    Timestamp:true,
});
module.exports=mongoose.model("User",userSchema);