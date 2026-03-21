
const admin = require("../firebaseAdmin");
const userModel = require("../model/usersModel");


exports.addStudent = async (req, res) => {
    const { name, email, rollno } = req.body;

    
    if (!name || !email || !rollno) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    
        
       
        const uid = userRecord.uid;

       
         userModel.createUser([uid, name, email, rollno, "student"]);

        res.status(201).json({
            success: true,
            message: "Student added successfully",
            uid
        });

    
        console.error("Add Student Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    
};