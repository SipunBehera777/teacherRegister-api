const db = require("../Config/db");

class QRAttendance {

    static startSession(data, callback) {

        const sql = `
        INSERT INTO attendance_sessions
        (assignment_id,date,qr_token,start_time,expiry_time,class_latitude,longitude,class_radius)
        VALUES (?,?,?,?,?,?,?,?)
        `;

        db.query(sql, [
            data.assignment_id,
            data.date,
            data.qr_token,
            data.start_time,
            data.expiry_time,
            data.class_latitude,
            data.longitude,
            data.class_radius
        ], callback);

    }

    static checkTodaySession(assignment_id, today, callback) {

        const sql = `
        SELECT * FROM attendance_sessions
        WHERE assignment_id=? AND date=?
        `;

        db.query(sql, [assignment_id, today], callback);
    }

    static getSessionByToken(token, callback) {

        db.query(
            "SELECT * FROM attendance_sessions WHERE qr_token=?",
            [token],
            callback
        );

    }

     static checkAlreadyMarked(student_id, attendance_id, callback) {
        const sql = `
            SELECT id FROM attendance_details
            WHERE student_id=? AND attendance_id=?
        `;
        db.query(sql, [student_id, attendance_id], callback);
    }

    static markAttendance(data, callback) {

        const sql = `
        INSERT INTO attendance_details
        (attendance_id, student_id, status, latitude, longitude, marked_time)
        VALUES (?, ?, ?, ?, ?, NOW())
        `;

        db.query(sql, [
            data.attendance_id,
            data.student_id,
            data.status || "Present",
            data.latitude,
            data.longitude
        ], callback);
    }

    // Update QR every 10 sec
    static updateSessionToken(data, callback) {
        const q = `
            UPDATE attendance_sessions 
            SET qr_token = ?, 
                start_time = NOW(), 
                expiry_time = DATE_ADD(NOW(), INTERVAL 10 SECOND)
            WHERE id = ?
        `;
        db.query(q, [data.token, data.id], callback);
    }
}

module.exports = QRAttendance;