
const express = require("express");
const router = express.Router();
const departmentController = require("../controller/departmentController");

router.post("/", departmentController.createDepartment);
router.get("/:college_id", departmentController.getDepartments);

module.exports = router;