const db = require("../Config/db");

class QRAttendance{

  static startSession(data,callback){
     const sql = "INSERT INTO attendance_sessions (assignment_id,date,qr_token,start_time,expiry_time,class_latitude,longitude,class_radius) VALUES (?,?,?,?,?,?,?,?)";

    db.query(sql,
    [
        data.assignmentid,
        data.date,
        data.qr_token,
        data.start_time,
        data.expiry_time,
        data.class_latitude,
        data.longitude,
        data.class_radius
    ],
    callback);


   db.query(sql,[assignment_id,token,expiry],callback);
  }

  static getSessionByToken(token,callback){
    db.query(
   "SELECT * FROM attendance_sessions WHERE qr_token=?",
   [token],
   callback
   );



  }

  static markAttendance(attendance_id,student_id,lat,lng,callback){

     const sql = "INSERT INTO attendance_details (attendance_id,status,student_id,marked_time,latitude,longitude) VALUES (?,?,?,?,?,?)";

    db.query(sql,
    [
        data.attendanceid,
        data.status,
        data.studentid,
        data.marked_time,
        data.latitude,
        data.longitude
    ],
    callback);
  }

  static checkAlreadyMarked(studentid,attendanceid,callback){

    const sql = "SELECT * FROM attendancedetails WHERE student_id=? AND attendance_id=?";

    db.query(sql,[studentid,attendanceid],callback);

  }

};
module.exports=QRAttendance;
