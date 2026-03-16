const QR = require("../model/qrAttendanceModel");
const getDistance = require("../Config/distance");



exports.startQRSession = (req, res) => {

  const { assignment_id, class_latitude, longitude } = req.body;

  if (!assignment_id) {
    return res.json({
      success: false,
      message: "Assignment ID required"
    });
  }

  const token = "QR_" + Date.now();

  const data = {
    assignment_id: assignment_id,
    date: new Date(),
    qr_token: token,
    start_time: new Date(),
    expiry_time: new Date(Date.now() + 15000),
    class_latitude: class_latitude,
    longitude: longitude,
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

    res.json({
      success: true,
      qr_token: token,
      session_id: result.insertId
    });

  });

};



exports.markAttendance = (req, res) => {

  const { studentid, token, latitude, longitude } = req.body;

  QR.getSessionByToken(token, (err, result) => {

    if (err || result.length == 0) {
      return res.json({
        success: false,
        message: "Invalid QR"
      });
    }

    const session = result[0];

    if (new Date() > new Date(session.expiry_time)) {
      return res.json({
        success: false,
        message: "QR Expired"
      });
    }

    const distance = getDistance(
      latitude,
      longitude,
      session.class_latitude,
      session.longitude
    );

    if (distance > session.class_radius) {
      return res.json({
        success: false,
        message: "Not in classroom"
      });
    }

    QR.checkAlreadyMarked(studentid, session.id, (err, result) => {

      if (result.length > 0) {
        return res.json({
          success: false,
          message: "Attendance already marked"
        });
      }

      const data = {
        attendance_id: session.id,
        status: "present",
        student_id: studentid,
        marked_time: new Date(),
        latitude: latitude,
        longitude: longitude
      };

      QR.markAttendance(data, (err, result) => {

        if (err) {
          return res.json({
            success: false,
            message: "Error marking attendance"
          });
        }

        res.json({
          success: true,
          message: "Attendance marked"
        });

      });

    });

  });

};