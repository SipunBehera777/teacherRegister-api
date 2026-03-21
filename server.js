

const express = require("express");
const cors = require("cors");
require("dotenv").config(); 
const fs = require("fs");
const path = require("path");


const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


const uploadPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

const teacherRoutes = require("./Router/teacherRoutes");
const studentRoutes=require("./Router/studentRouter")
const assignmentRoutes = require("./Router/ass_subjectRoute");
const attendanceRoutes = require("./Router/attendanceRouter");
const authRoutes = require("./Router/authRoutes");

const qrRoutes =
require("./Router/qrAttendanceRouts");
const materialRoutes = require("./Router/studyMaterialRoutes");
const userRoutes = require("./Router/userRoute");



app.use("/api/auth", authRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students",studentRoutes);
app.use("/uploads", express.static("uploads"));

app.use("/api/assignments", assignmentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/materials", materialRoutes);

app.use("/api/colleges", require("./Router/collegeRoutes"));
app.use("/api/departments", require("./Router/departmentRoutes"));
app.use("/api/semesters", require("./Router/semesterRoutes"));
app.use("/api/batches", require("./Router/batchRoutes"));
app.use("/api/sections", require("./Router/sectionRoutes"));
app.use("/api/groups", require("./Router/groupRoutes"));
app.use("/api/subjects", require("./Router/subjectRoutes"));
app.use("/api/Qr_attendance",qrRoutes);
app.use("/api/users", userRoutes);

const PORT = 3306;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
