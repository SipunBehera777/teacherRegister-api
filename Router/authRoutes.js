
const express = require("express");
const router = express.Router();

const loginController = require("../controller/fibaseAdminController");

router.post("/firebase-login", loginController.firebaseLogin);

router.post("/studentLogin", loginController.studentFirebaseLogin);


module.exports = router;