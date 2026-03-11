const express = require("express");
const router = express.Router();
const attendanceController = require("../controller/attendanceController");

router.post("/start", attendanceController.startAttendance);

router.post("/mark", attendanceController.markAttendance);

router.get("/history/:assignment_id", attendanceController.getAttendanceHistory);

module.exports = router;