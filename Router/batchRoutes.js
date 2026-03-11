

const express = require("express");
const router = express.Router();
const batchController = require("../controller/batchController");

router.post("/", batchController.addBatch);
router.get("/:collegeId", batchController.getBatches);

module.exports = router;