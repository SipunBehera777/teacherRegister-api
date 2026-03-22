const admin = require("../firebaseAdmin");
const db = require("../Config/db");

exports.firebaseLogin = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token is required"
            });
        }

        const uid = await verifyFirebaseToken(token);

        // Check Teacher
        const [teacherRows] = await db.promise().query(
            "SELECT teacher_id, teacher_name, email, dept_id, college_id FROM teacher WHERE firebase_uid = ?",
            [uid]
        );

        if (teacherRows.length > 0) {
            const teacher = teacherRows[0];

            return res.json({
                success: true,
                role: "teacher",
                data: teacher
            });
        }

        // Check Student
        const [studentRows] = await db.promise().query(
            "SELECT id, fullname, email, collegeID FROM students WHERE firebase_uid = ?",
            [uid]
        );

        if (studentRows.length > 0) {
            const student = studentRows[0];

            return res.json({
                success: true,
                role: "student",
                data: student
            });
        }

        return res.status(404).json({
            success: false,
            message: "User not found"
        });

    } catch (error) {
        console.error("VERIFY ERROR:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};