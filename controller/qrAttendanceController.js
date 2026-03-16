
const QR=require("../model/qrAttendanceModel");
const getDistance = require("../Config/distance");
const { v4: uuidv4 } = require("uuid");

exports.startQRSession = (req, res) => {

    var assignmentid = req.body.assignment_id;
    var latitude = req.body.class_latitude;
    var longitude = req.body.longitude;

    if(!assignmentid){
        return res.json({
            success:false,
            message:"Assignment ID required"
        });
    }

    var token = "QR_" + Date.now();

    var data = {
        assignment_id: assignmentid,
        date: new Date(),
        qr_token: token,
        start_time: new Date(),
        expiry_time: new Date(Date.now() + 15000),
        class_latitude: latitude,
        longitude: longitude,
        class_radius: 50
    };

    QR.startSession(data,(err,result)=>{

        if(err){
            console.log(err);

           return res.json({
                success:false,
                message:"Error creating QR session"
            });

        }else{

            res.json({
                success:true,
                qr_token: token,
                session_id: result.insertId
            });

        }

    });

};

exports.markAttendance=(req,res)=>{
  const {studentid,token,latitude,longitude} = req.body;

  QR.getSessionByToken(token,(err,result)=>{
    

if(err || session.length==0){
            return res.json({success:false,message:"Invalid QR"});
        }

        var s = session[0];

        if(new Date() > new Date(s.expiry_time)){
            return res.json({success:false,message:"QR Expired"});
        }

        var distance = getDistance(lat,lng,s.latitude,s.longitude);

        if(distance > s.radius){
            return res.json({success:false,message:"Not in classroom"});
        }

        attendanceModel.checkAlreadyMarked(studentid,s.id,function(err,result){

            if(result.length > 0){
                return res.json({success:false,message:"Attendance already marked"});
            }

            var data = {
                attendanceid: s.id,
                status: "present",
                studentid: studentid,
                marked_time: new Date(),
                student_lat: lat,
                student_lng: lng
            };

           QR.markAttendance(data,(err,result)=>{

                if(err){
                 return   res.json({success:false,message:"Error marking attendance"});
                }else{
                    res.json({success:true,message:"Attendance marked"});
                }

           });

               
        });

    
  });



};
