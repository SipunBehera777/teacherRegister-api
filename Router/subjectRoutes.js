
const express = require("express");
const router = express.Router();
const subjectController = require("../controller/subjectController");

router.post("/", subjectController.addSubject);
router.get("/:departmentId/:semesterId", subjectController.getSubjects);

module.exports = router;