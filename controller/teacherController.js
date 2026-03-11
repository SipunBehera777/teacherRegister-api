
const db = require("../Config/db");
const bcrypt = require("bcrypt");

exports.addTeacher = async (req, res) => {

  try {

    const { teacher_name, email, phone, college_id, dept_id, firebase_uid } = req.body;

    

   

    // 2️ Store teacher in MySQL
    const sql = `
        INSERT INTO teacher
        (teacher_name,email,phone,college_id,dept_id,firebase_uid)
        VALUES (?,?,?,?,?,?)
    `;

    db.query(sql,
      [teacher_name, email, phone, college_id, dept_id, firebase_uid],
      (err, result) => {

        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          success: true,
          message: "Teacher created successfully",
          uid: firebase_uid
        });

      }
    );

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.getTeacherByUid = (req,res)=>{

    const {uid} = req.body;

    const sql = "SELECT * FROM teacher WHERE firebase_uid=?";

    db.query(sql,[uid],(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json({
            success:true,
            data: result[0]
        });

    });

};





exports.updateTeacher = async (req, res) => {
    try {

        const teacher_id = req.params.id;

        const {
            teacher_name,
            email,
            phone,
            dept_id,
            college_id,
            password
        } = req.body;

        let sql;
        let values;

        // If password is provided → update password also
        if (password) {

            const hashedPassword = await bcrypt.hash(password, 10);

            sql = `
                UPDATE teacher
                SET teacher_name=?, email=?, phone=?, dept_id=?, college_id=?, password=?
                WHERE teacher_id=?
            `;

            values = [
                teacher_name,
                email,
                phone,
                dept_id,
                college_id,
                hashedPassword,
                teacher_id
            ];

        } else {

            sql = `
                UPDATE teacher
                SET teacher_name=?, email=?, phone=?, dept_id=?, college_id=?
                WHERE teacher_id=?
            `;

            values = [
                teacher_name,
                email,
                phone,
                dept_id,
                college_id,
                teacher_id
            ];
        }

        db.query(sql, values, (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err
                });
            }

            res.status(200).json({
                success: true,
                message: "Teacher updated successfully"
            });

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });

    }
};


exports.deleteTeacher = (req, res) => {

    const teacher_id = req.params.id;

    const sql = "DELETE FROM teacher WHERE teacher_id=?";

    db.query(sql, [teacher_id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error",
                error: err
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Teacher deleted successfully"
        });

    });

};

exports.getTeachersByCollegeDept = (req, res) => {

    const { college_id, dept_id } = req.query;

     const sql = `
        SELECT 
            t.teacher_id,
            t.teacher_name,
            t.email,
            t.phone,
            t.dept_id,
            d.department_name
        FROM teacher t
        JOIN departments d ON t.dept_id = d.id
        WHERE t.college_id = ? AND t.dept_id = ?
    `;

    db.query(sql, [college_id, dept_id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success:false,
                error:err
            });
        }

        res.status(200).json({
            success:true,
            data: result
        });

    });
};

