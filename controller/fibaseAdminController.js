const admin = require("../firebaseAdmin");
const db = require("../Config/db");

exports.firebaseLogin = async (req, res) => {
    try {
        const { token } = req.body;

        // 1️⃣ Verify Firebase token
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;

        // 2️⃣ Lookup user in MySQL using UID
        const [rows] = await db.promise().query(
            "SELECT * FROM users WHERE firebase_uid = ?",
            [uid]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const user = rows[0];

        return res.json({
            success: true,
            role: user.role,
            email: user.email,
            college_id: user.college_id,
            user_id: user.id
        });

    } catch (error) {
        console.error("VERIFY ERROR:", error);

        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};