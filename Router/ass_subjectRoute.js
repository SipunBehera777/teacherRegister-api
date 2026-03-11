const express = require("express");
const router = express.Router();
const assignController = require("../controller/assSubjectController");

router.post("/assign-subject", assignController.assignSubject);

router.get("/teacher-subject/:teacher_id", assignController.getTeacherSubjects);

module.exports = router;