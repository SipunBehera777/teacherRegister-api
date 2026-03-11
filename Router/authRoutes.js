
const express = require("express");
const router = express.Router();

const loginController = require("../controller/fibaseAdminController");

router.post("/firebase-login", loginController.firebaseLogin);

module.exports = router;