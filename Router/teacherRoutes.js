
const express=require('express');
const teacherRouter=express.Router();
const teacherController = require("../controller/teacherController");
 
teacherRouter.post("/register",teacherController.registerTeacher);

teacherRouter.delete("/delete/:id",teacherController.deleteTeacher);

teacherRouter.put("/update/:id",teacherController.updateTeacher);

teacherRouter.get("/all", teacherController.getAll);


module.exports = teacherRouter;