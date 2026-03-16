const QR = require("../model/qrAttendanceModel");
const getDistance = require("../Config/distance");
const moment = require("moment-timezone");
const { v4: uuidv4 } = require("uuid");


// ==============================
// START QR SESSION
// ==============================
exports.startQRSession = (req, res) => {

    const { assignment_id, class_latitude, longitude } = req.body;

    if (!assignment_id) {
        return res.json({
            success: false,
            message: "Assignment ID required"
        });
    }

    // India timezone
    const today = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
    const now = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    const expiry = moment().tz("Asia/Kolkata").add(15, "seconds").format("YYYY-MM-DD HH:mm:ss");

    const token = "QR_" + Date.now();

    // Check if session already started today
    QR.checkTodaySession(assignment_id, today, (err, result) => {

        if (err) {
            console.log(err);
            return res.json({ success: false, message: "DB Error" });
        }

        if (result.length > 0) {
            return res.json({
                success: false,
                message: "Attendance already started today"
            });
        }

        const data = {
            assignment_id,
            date: today,
            qr_token: token,
            start_time: now,
            expiry_time: expiry,
            class_latitude,
            longitude,
            class_radius: 50
        };

        QR.startSession(data, (err, result) => {

            if (err) {
                console.log(err);
                return res.json({
                    success: false,
                    message: "Error creating session"
                });
            }

            return res.json({
                success: true,
                qr_token: token,
                session_id: result.insertId
            });

        });

    });

};


// ==============================
// MARK ATTENDANCE
// ==============================
exports.markAttendance = (req, res) => {

    const { studentid, token, latitude, longitude } = req.body;

    QR.getSessionByToken(token, (err, session) => {

        if (err || session.length === 0) {
            return res.json({
                success: false,
                message: "Invalid QR"
            });
        }

        const s = session[0];

        // Check expiry
        if (new Date() > new Date(s.expiry_time)) {
            return res.json({
                success: false,
                message: "QR Expired"
            });
        }

        // Check classroom distance
        const distance = getDistance(latitude, longitude, s.class_latitude, s.longitude);

        if (distance > s.class_radius) {
            return res.json({
                success: false,
                message: "Not in classroom"
            });
        }

        // Check already marked
        QR.checkAlreadyMarked(studentid, s.id, (err, result) => {

            if (result.length > 0) {
                return res.json({
                    success: false,
                    message: "Attendance already marked"
                });
            }

            const data = {
                attendanceid: s.id,
                status: "present",
                studentid: studentid,
                marked_time: moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss"),
                latitude,
                longitude
            };

            QR.markAttendance(data, (err, result) => {

                if (err) {
                    console.log(err);
                    return res.json({
                        success: false,
                        message: "Error marking attendance"
                    });
                }

                return res.json({
                    success: true,
                    message: "Attendance marked"
                });

            });

        });

    });

};