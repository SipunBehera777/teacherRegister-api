
const express = require("express");
const router = express.Router();
const semesterController = require("../controller/semesterController");

router.post("/", semesterController.addSemester);
router.get("/:collegeId", semesterController.getSemesters);

module.exports = router;