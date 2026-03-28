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





  

  static editAttendance(attendance_id, students, callback) {
    if (!students || students.length === 0) return callback(new Error("Student list empty"));

    const sql = `UPDATE attendance_details SET status = ? WHERE attendance_id = ? AND student_id = ?`;
    let completed = 0;

    students.forEach(student => {
      db.query(sql, [student.status, attendance_id, student.student_id], (err) => {
        if (err) return callback(err);
        completed++;
        if (completed === students.length) callback(null, { message: "Attendance updated successfully" });
      });
    });
  }

static getAttendanceStats(studentId, callback) {

    const sql = `
      SELECT 
        s.id,
        s.subject_name AS name,
        s.subject_code AS code,

        COUNT(asess.id) AS total_classes,

        COALESCE(SUM(
          CASE 
            WHEN ad.status = 'Present' THEN 1 
            ELSE 0 
          END
        ), 0) AS attended_classes

      FROM subjects s

    

      JOIN attendance_sessions asess 
        ON a.id = asess.assignment_id

      LEFT JOIN attendance_details ad 
        ON asess.id = ad.attendance_id 
        AND ad.student_id = ?

      GROUP BY s.id, s.subject_name, s.subject_code
    `;

    db.query(sql, [studentId], (err, results) => {
      if (err) return callback(err);

      //  Add percentage
      const processedData = results.map(row => {
        const percentage = row.total_classes > 0
          ? Math.round((row.attended_classes / row.total_classes) * 100)
          : 0;

        return {
          subject_id: row.id,
          name: row.name,
          code: row.code,
          total_classes: row.total_classes,
          attended_classes: row.attended_classes,
          percentage: percentage
        };
      });

      callback(null, processedData);
    });
  }
  
}

module.exports = Attendance;
