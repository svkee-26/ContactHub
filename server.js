const express=require("express");
const errorHandler = require("./middlewares/errorHandlers");
const app=express();
const dotenv=require("dotenv").config();
const port=process.env.PORT || 5000;
const connectDb = require("./ContactHub/config/dbConnection");
connectDb();
app.use(express.json());
app.use("/api/contacts",require("./ContactHub/routes/contactRoutes"));
app.use("/api/users",require("./ContactHub/routes/userRoutes"));
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`server is running on the port ${port}`);
});