
const express = require("express");
const router = express.Router();
const groupController = require("../controller/groupController");
router.post("/", groupController.addGroup);
router.get("/:sectionId", groupController.getGroups);

module.exports = router;