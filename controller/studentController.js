const Students = require("../model/studentModel");

exports.registerStudent = (req, res) => {

  const {
    collegeID,
    fullname,
    rollno,
    regd_no,
    mobileno,
    email,
    batch,
    department,
    sem,
    section,
    group,
    password,
  } = req.body;

  // Cloudinary image URL
  const image = req.file ? req.file.path : null;

  const studentData = {
    collegeID,
    fullname,
    rollno,
    regd_no,
    mobileno,
    email,
    batch,
    department,
    sem,
    section,
    group,
    password,
    image
  };

  Students.register(studentData, (err, result) => {

    if (err) {
      console.error("Register Student Error:", err);
      return res.status(500).json({
        success: false,
        error: err.sqlMessage || err.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Student Added Successfully",
      studentID: result.insertId,
      imageUrl: image
    });

  });
};


exports.getAllStudent=(req,res)=>{
Students.getAll((callack,results)=>{
  if(err){
     console.error("Fetch Error:", err);
     return res.status(500).json({
       success: false,
        error: err.sqlMessage || err.message
     })
  }
return res.status(200).json({
   success: true,
      data: results
})
})


}

exports.filterStudent=async (req,res)=>{
  try{
    const{collegeID,batch,department,section,group}=req.query;
    
        if (!collegeID) {
            return res.status(400).json({
                success: false,
                message: "collegeID is required"
            });
        }

       const students= await Students.filterStudent
        (collegeID,batch,department,section,group);

         res.status(200).json({
            success: true,
            data:students
        });
  }catch(error){

      console.error("Filter Error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

  }
}

exports.filter_student_for_attendance=async (req,res)=>{
  try{
    const{collegeID,batch,department,section,semester}=req.query;
    
        if (!collegeID) {
            return res.status(400).json({
                success: false,
                message: "collegeID is required"
            });
        }

       const students= await Students.filterStudent
        (collegeID,batch,department,section,semester);

         res.status(200).json({
            success: true,
            data:students
        });
  }catch(error){

      console.error("Filter Error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

  }
}






exports.deleteStudent=(req,res)=>{
  const id=req.params.id;

  
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Student ID required"
    });
  }
  Students.delete(id,err=>{
    if (err) {
      console.error("Delete Error:", err);
      return res.status(500).json({
        success: false,
        error: err.sqlMessage || err.message
      });
    }

     res.json({
      success: true,
      message: "Student Deleted Successfully"
    });
  })
}

exports.updateStudent = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Student ID required"
    });
  }

  const image = req.file ? req.file.path : req.body.image;

  const updatedData = {
    ...req.body,
    image
  };

  Students.updateStudent(id, updatedData, (err, result) => {
    if (err) {
      console.error("Update Error:", err);
      return res.status(500).json({
        success: false,
        error: err.sqlMessage || err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Student Updated Successfully",
      imageUrl: image
    });
  });
};