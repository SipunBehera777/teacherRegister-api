
const express=require('express');
const teacherRouter=express.Router();
const teacherController = require("../controller/teacherController");
 
teacherRouter.post("/register",teacherController.addTeacher);

teacherRouter.delete("/delete/:id",teacherController.deleteTeacher);

teacherRouter.put("/update/:id",teacherController.updateTeacher);

teacherRouter.get("/filter", teacherController.getTeachersByCollegeDept);



module.exports = teacherRouter;
