
const express = require("express");
const router = express.Router();

const qrController =
require("../controller/qrAttendanceController");

router.post(
 "/start-qr-attendance",
 qrController.startQRSession
);

router.post(
 "/mark-qr-attendance",
 qrController.markAttendance
);

module.exports = router;