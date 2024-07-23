const mongoose=require("mongoose");
const contactSchema=mongoose.Schema({
    user_id:{
         type:mongoose.Schema.Types.ObjectId,
         required:true,
         reference:"User",
    },
    name:{
        type:String,
        required:[true,"Please provide the contact name "],
    },
    email:{
        type:String,
        required:[true,"Please provide the contact email address "],
    },
    phone:{
        type:String,
        required:[true,"Please provide the contact Phone number "],
    },

},
{
      Timestamp:true
}
);
module.exports=mongoose.model("Contact",contactSchema);