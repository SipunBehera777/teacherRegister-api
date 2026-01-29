
const express=require('express');
const teacherRouter=express.Router();
const teacherController = require("../controller/teacherController");
 
teacherRouter.post("/register",teacherController.registerTeacher);


module.exports = teacherRouter;