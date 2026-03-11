
const admin = require("../firebaseAdmin");
const db = require("../Config/db");


exports.firebaseLogin = async (req, res) => {

    try {

        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token missing"
            });
        }

        // Verify Firebase Token
        const decodedToken = await admin.auth().verifyIdToken(token);

        const uid = decodedToken.uid;
        const email = decodedToken.email;

        // Check user in MySQL
        const [rows] = await db.query(
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

        console.error(error);

        return res.status(401).json({
            success: false,
            message: "Invalid Firebase token"
        });
    }
};