const express=require("express");
const app=express();
const router=express.Router();
const {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact}=require("../controllers/contactControllers");
    const validateToken=require("../middlewares/validateTokenHandler");
    app.use(validateToken);
router.route("/").get(getContacts);
router.route("/:id").get(getContact);
router.route("/:id").put(updateContact);
router.route("/").post(createContact);
router.route("/:id").delete(deleteContact);
module.exports=router;