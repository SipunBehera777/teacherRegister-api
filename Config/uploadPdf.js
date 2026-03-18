const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../Config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // 1. Identify documents vs images
    const isDocument = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ].includes(file.mimetype);

    // 2. Set Cloudinary resource_type & folder
    const resourceType = isDocument ? "raw" : "image";
    const folder = isDocument ? "student_uploads/documents" : "student_uploads/images";

    // 3. Sanitize Filename (Remove spaces/special chars)
    const sanitizedName = file.originalname
      .split('.')[0]
      .replace(/[^a-z0-9]/gi, '_');

    return {
      folder: folder,
      resource_type: resourceType,
      public_id: `${Date.now()}-${sanitizedName}`,
    };
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg", "image/png", "image/webp", 
    "application/pdf", "application/msword", 
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only Images and Docs (PDF/Word/Excel) are allowed."), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

module.exports = upload;