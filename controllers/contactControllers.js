const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModels");
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts=asyncHandler(async(req,res)=>{
    const contacts=await Contact.find({user_id:user.req.id});
    res.status(200).json(contacts);
});
//@desc Create  contacts
//@route POST /api/contacts
//@access private
const createContact=asyncHandler(async(req,res)=>{
    console.log("the request body is ",req.body);
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory! ");
    }
    const contact=await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    });
    res.status(201).json(contact);
});
//@desc Get  contact
//@route GET /api/contacts/:id
//@access private
const getContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});
//@desc Update  contact
//@route PUT /api/contacts/:id
//@access private
const updateContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User does not have the permission to update another user contact")
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true},
);
    res.status(201).json({message:`Update contacts for ${req.params.id}`});
});

//@desc Delete all contacts
//@route Delete /api/contacts/:id
//@access private
const deleteContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User does not have the permission to update another user contact")
    }
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
});

module.exports={getContacts,getContact,updateContact,createContact,deleteContact};