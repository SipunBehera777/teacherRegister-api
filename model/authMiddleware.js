const admin = require("../firebaseAdmin");

exports.verifyToken = async (req, res, next) => {

  const token = req.headers.authorization;

  try {
    const decoded = await admin.auth().verifyIdToken(token);

    req.user = decoded;
    req.role = decoded.role;

    next();

  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

exports.allowRoles = (...roles) => {
  return (req, res, next) => {

    if (!roles.includes(req.role)) {
      return res.status(403).json({ message: "Access Denied" });
    }

    next();
  };
};