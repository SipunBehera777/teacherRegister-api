const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage=new CloudinaryStorage({
cloudinary: cloudinary,
  params: {
    folder: "student_uploads",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
// File validation (important)
});

const upload = multer({ storage });

module.exports = upload;