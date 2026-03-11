
const express = require("express");
const router = express.Router();
const collegeController = require("../controller/collegeController");

router.post("/", collegeController.createCollege);
router.get("/", collegeController.getColleges);
router.get("/:code", collegeController.getCollegeByCode);



module.exports = router;