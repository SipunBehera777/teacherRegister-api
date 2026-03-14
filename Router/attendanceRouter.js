const express = require("express");
const router = express.Router();
const attendanceController = require("../controller/attendanceController");

router.post("/start", attendanceController.startAttendance);

router.post("/mark", attendanceController.markAttendance);




router.put("/edit", attendanceController.editAttendance);



module.exports = router;



