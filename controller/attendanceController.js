const Attendance = require("../model/attendanceModel");

exports.startAttendance = (req, res) => {

  Attendance.createSession(req.body, (err, result) => {

    if (err) {
      return res.status(500).json({
        success:false,
        message:err.sqlMessage || err.message
      });
    }

    
    res.json({
      success:true,
      attendance_id: result.attendance_id,
      message:"Attendance session started"
    });

  });

};

exports.markAttendance = (req, res) => {

  Attendance.markAttendance(req.body, (err) => {

    if (err) {
      return res.status(500).json({
        success:false,
        message:err.sqlMessage || err.message
      });
    }

    res.json({
      success:true,
      message:"Attendance saved"
    });

  });

};


exports.editAttendance = (req, res) => {
  const { attendance_id, students } = req.body;
  Attendance.editAttendance(attendance_id, students, (err, result) => {
    if (err) return res.status(500).json({ success:false, message:err.sqlMessage || err.message });
    res.json({ success:true, message: result.message });
  });
};



exports.getStudentDashboard = (req, res) => {

  const studentId = req.params.studentId;

  if (!studentId) {
    return res.status(400).json({
      success: false,
      message: "Student ID is required"
    });
  }

  Attendance.getAttendanceStats(studentId, (err, data) => {

    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch attendance data"
      });
    }

    return res.status(200).json({
      success: true,
      data: data
    });
  });
};