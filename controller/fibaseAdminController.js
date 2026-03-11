const admin = require("../firebaseAdmin");
const db = require("../Config/db");

exports.firebaseLogin = async (req, res) => {

    try {

        const { token } = req.body;

        const decodedToken = await admin.auth().verifyIdToken(token);

        const uid = decodedToken.uid;

        const [rows] = await db.promise().query(
            "SELECT * FROM teacher WHERE firebase_uid = ?",
            [uid]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found"
            });
        }

        const teacher = rows[0];

        return res.json({
            success: true,
            teacher_id: teacher.teacher_id,
            teacher_name: teacher.teacher_name,
            email: teacher.email,
            dept_id: teacher.dept_id,
            college_id: teacher.college_id
        });

    } catch (error) {

        console.error("VERIFY ERROR:", error);

        return res.status(401).json({
            success: false,
            message: error.message
        });
    }

};