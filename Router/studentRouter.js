const express = require("express");
const upload = require("../Config/multerCloudinary"); // make sure folder name matches
const studentrouter = express.Router();
const studentController = require("../controller/studentController");

// Postman / Android form-data key
studentrouter.post(
  "/register",
  upload.single("image"),
  studentController.registerStudent
);
studentrouter.get
("/all",studentController.getAllStudent);
studentrouter.get("/",studentController.filterStudent);

studentrouter.get("/filter",studentController.filter_student_for_attendance);

studentrouter.delete("/delete/:id",studentController.deleteStudent);
studentrouter.put(
  "/update/:id",
  upload.single("image"), 
  studentController.updateStudent
);
module.exports = studentrouter;
