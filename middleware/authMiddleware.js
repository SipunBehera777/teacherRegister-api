const admin = require("../firebaseAdmin");
const db = require("../Config/db");

//  Verify Firebase Token
exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(token);

    req.user = decoded; // contains uid
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};

// Teacher Only
exports.isTeacher = async (req, res, next) => {
  const uid = req.user.uid;

  const [rows] = await db.promise().query(
    "SELECT * FROM teacher WHERE firebase_uid = ?",
    [uid]
  );

  if (rows.length === 0) {
    return res.status(403).json({
      success: false,
      message: "Only teacher allowed"
    });
  }

  next();
};

//  Student Only
exports.isStudent = async (req, res, next) => {
  const uid = req.user.uid;

  const [rows] = await db.promise().query(
    "SELECT * FROM students WHERE firebase_uid = ?",
    [uid]
  );

  if (rows.length === 0) {
    return res.status(403).json({
      success: false,
      message: "Only student allowed"
    });
  }

  next();
};