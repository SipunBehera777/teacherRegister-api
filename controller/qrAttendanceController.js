
const QR=require("../model/qrAttendanceModel");
const getDistance = require("../Config/distance");
const { v4: uuidv4 } = require("uuid");

exports.startQRSession=(req,res)=>{
   
 var token = "QR_" + Date.now();

    var data = {
        assignmentid: req.body.assignmentid,
        date: new Date(),
        qr_token: token,
        start_time: new Date(),
        expiry_time: new Date(Date.now()+15000),
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        radius: 50
    };

    QR.startSession(data,(err,result)=>{

       if(err){
            res.json({success:false,message:"Error creating session"});
        }else{
            res.json({
                success:true,
                qr_token: token
            });
        }

    })
 
}

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
                    res.json({success:false,message:"Error marking attendance"});
                }else{
                    res.json({success:true,message:"Attendance marked"});
                }

           });

               
        });

    
  });



};
