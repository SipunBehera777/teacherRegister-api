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

exports.getAttendanceHistory = (req, res) => {

  const assignment_id = req.params.assignment_id;

  Attendance.getHistory(assignment_id, (err, results) => {

    if (err) {
      return res.status(500).json({
        success:false,
        message:err.message
      });
    }

    res.json({
      success:true,
      data:results
    });

  });

};