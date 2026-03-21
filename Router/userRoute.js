
const express=require('express');
const router=express.Router();
const userController = require("../controller/userController");
const { verifyToken, allowRoles } = require("../model/authMiddleware");

// Admin → Add student
router.post(
    "/add-student",
    verifyToken,
    allowRoles("admin"),
    userController.addStudent
);



module.exports = router;