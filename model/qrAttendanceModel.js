const db = require("../Config/db");

class QRAttendance {

  static startSession(data, callback) {

    const sql = `
    INSERT INTO attendance_sessions
    (assignment_id,date,qr_token,start_time,expiry_time,class_latitude,longitude,class_radius)
    VALUES (?,?,?,?,?,?,?,?)
    `;

    db.query(sql,
      [
        data.assignment_id,
        data.date,
        data.qr_token,
        data.start_time,
        data.expiry_time,
        data.class_latitude,
        data.longitude,
        data.class_radius
      ],
      callback
    );
  }


  static getSessionByToken(token, callback) {

    const sql = "SELECT * FROM attendance_sessions WHERE qr_token=?";

    db.query(sql, [token], callback);
  }


  static markAttendance(data, callback) {

    const sql = `
    INSERT INTO attendance_details
    (attendance_id,status,student_id,marked_time,latitude,longitude)
    VALUES (?,?,?,?,?,?)
    `;

    db.query(sql,
      [
        data.attendance_id,
        data.status,
        data.student_id,
        data.marked_time,
        data.latitude,
        data.longitude
      ],
      callback
    );
  }


  static checkAlreadyMarked(student_id, attendance_id, callback) {

    const sql = `
    SELECT * FROM attendance_details
    WHERE student_id=? AND attendance_id=?
    `;

    db.query(sql, [student_id, attendance_id], callback);
  }

  static checkTodaySession(assignment_id,callback){

 const sql = `
 SELECT * FROM attendance_sessions
 WHERE assignment_id=? AND DATE(date)=CURDATE()
 `;

 db.query(sql,[assignment_id],callback);

}

}

module.exports = QRAttendance;