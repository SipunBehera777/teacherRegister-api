 const QR = require("../model/qrAttendanceModel");
const calculateDistance = require("../Config/distance");
const moment = require("moment-timezone");
const { v4: uuidv4 } = require("uuid");



exports.startQRSession = (req, res) => {
    const { assignment_id, class_latitude, longitude } = req.body;

    if (!assignment_id) {
        return res.json({ success: false, message: "Assignment ID required" });
    }

    const today = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
    const now = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    // Set expiry slightly longer than the refresh rate (e.g., 20s) to avoid race conditions
    const expiry = moment().tz("Asia/Kolkata").add(20, "seconds").format("YYYY-MM-DD HH:mm:ss");
    
    // Create a truly unique token using UUID or Timestamp
    const token = "QR_" + uuidv4().substring(0, 8) + "_" + Date.now();

    // Check if session exists for today
    QR.checkTodaySession(assignment_id, today, (err, result) => {
        if (err) return res.json({ success: false, message: "DB Error" });

        if (result.length > 0) {
            // UPDATE existing session with NEW token and expiry
            const sessionId = result[0].id;
            const updateData = [token, now, expiry, sessionId];
            
            // Assuming you add an updateToken method in your model
            QR.updateSessionToken(updateData, (updateErr, updateResult) => {
                if (updateErr) return res.json({ success: false, message: "Update Error" });
                return res.json({ success: true, qr_token: token, session_id: sessionId ,
                    expiry_time: expiry
                });
            });
        } else {
            // INSERT new session
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

            QR.startSession(data, (err, insertResult) => {
                if (err) return res.json({ success: false, message: "Insert Error" });
                return res.json({ success: true, qr_token: token, session_id: insertResult.insertId,
                    expiry_time: expiry
                 });
            });
        }
    });
};
 
 
 
 
 
 
 
 
 
 
 exports.markAttendance = (req, res) => {

    const { qrToken, latitude, longitude, student_id } = req.body;

    // Validation
    if (!qrToken || !latitude || !longitude || !student_id) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    // 1️Get session
    QR.getSessionByToken(qrToken, (err, sessionResult) => {

        if (err) return res.status(500).json(err);

        if (sessionResult.length === 0) {
            return res.status(400).json({ message: "Invalid QR" });
        }

        const session = sessionResult[0];

        // 2️Check expiry
        const now = new Date();
        if (new Date(session.expiry_time) < now) {
            return res.status(400).json({ message: "QR Expired" });
        }

        // 3️ Check distance
        const distance = calculateDistance(
            latitude,
            longitude,
            session.latitude,
            session.longitude
        );

        if (distance > session.radius) {
            return res.status(400).json({
                message: "Outside allowed area",
                distance: distance
            });
        }

        // 4️Check duplicate
        QR.checkAlreadyMarked(
            student_id,
            session.id,
            (err, existing) => {

                if (err) return res.status(500).json(err);

                if (existing.length > 0) {
                    return res.status(400).json({ message: "Already marked" });
                }

                // 5️ Insert attendance
                QR.markAttendance({
                    attendance_id: session.id,
                    student_id,
                    latitude,
                    longitude
                }, (err, result) => {

                    if (err) {

                        // DB duplicate safety
                        if (err.code === "ER_DUP_ENTRY") {
                            return res.status(400).json({ message: "Already marked" });
                        }

                        return res.status(500).json(err);
                    }

                    return res.status(200).json({
                        message: "Attendance marked successfully",
                        distance: distance
                    });
                });
            }
        );
    });
};