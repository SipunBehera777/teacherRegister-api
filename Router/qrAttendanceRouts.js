
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

router.get("/session/:session_id/qr", qrController.getTemporaryQR); // get QR token every 15 sec


module.exports = router;