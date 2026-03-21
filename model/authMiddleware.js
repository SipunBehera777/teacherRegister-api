
const admin = require("../firebaseAdmin");
const db = require("../Config/db");

// Verify Firebase token
exports.verifyToken =  (req, res, next) => {
    const token = req.headers.authorization;

    try {
        const decoded =  admin.auth().verifyIdToken(token);
        req.user = decoded;

        // get role from DB
        db.query(
            "SELECT role FROM users WHERE firebase_uid = ?",
            [decoded.uid],
            (err, result) => {
                req.userRole = result[0].role;
                next();
            }
        );

    } catch (err) {
        res.status(401).json({ message: "Unauthorized" });
    }
};

// Role check
exports.allowRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.userRole)) {
            return res.status(403).json({ message: "Access Denied" });
        }
        next();
    };
};