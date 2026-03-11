const db = require("../Config/db");

class Attendance {

  // Create attendance session
  static createSession(data, callback) {

    const sql = `
      INSERT INTO attendance_sessions (assignment_id, date)
      VALUES (?, ?)
    `;

    db.query(sql, [data.assignment_id, data.date], (err, result) => {

      if (err) return callback(err);

      // return inserted session id
      callback(null, {
        attendance_id: result.insertId
      });

    });
  }


  // Mark student attendance (bulk insert)
  static markAttendance(data, callback) {

    if (!data.students || data.students.length === 0) {
      return callback(new Error("Student list empty"));
    }

    const values = data.students.map(student => [
      data.attendance_id,
      student.student_id,
      student.status
    ]);

    const sql = `
      INSERT INTO attendance_details
      (attendance_id, student_id, status)
      VALUES ?
    `;

    db.query(sql, [values], callback);
  }


  // Get attendance history
  static getHistory(assignment_id, callback) {

    const sql = `
      SELECT *
      FROM attendance_sessions
      WHERE assignment_id = ?
      ORDER BY date DESC
    `;

    db.query(sql, [assignment_id], callback);
  }


  // Get students attendance for a session
  static getSessionDetails(attendance_id, callback) {

    const sql = `
      SELECT 
        ad.student_id,
        ad.status
      FROM attendance_details ad
      WHERE ad.attendance_id = ?
    `;

    db.query(sql, [attendance_id], callback);
  }

}

module.exports = Attendance;