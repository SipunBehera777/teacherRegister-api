

const express = require("express");
const router = express.Router();
const sectionController = require("../controller/sectionController");

router.post("/", sectionController.addSection);
router.get("/:departmentId/:semesterId", sectionController.getSections);
module.exports = router;