
const express = require("express");
const router = express.Router();

const controller = require("../controller/study_meterialController");
const upload = require("../Config/uploadPdf");

// upload file
router.post(
  "/upload",
  upload.single("file"),
  controller.uploadMaterial
);

// get materials
router.get("/", controller.getMaterials);

// delete
router.delete("/:id", controller.deleteMaterial);

module.exports = router;