const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // 1. Identify if the file is a document/spreadsheet
    const isDocument = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ].includes(file.mimetype);

    // 2. Set Cloudinary resource_type
    // Images (jpg, png, etc.) = "image"
    // Documents (pdf, docx, etc.) = "raw"
    const resourceType = isDocument ? "raw" : "image";
    
    // 3. Set folder based on type
    const folder = isDocument ? "student_uploads/documents" : "student_uploads/images";

    return {
      folder: folder,
      resource_type: resourceType,
      public_id: Date.now() + "-" + file.originalname.split('.')[0].replace(/\s/g, '_'),
    };
  }
});

// Added a filter to ensure only images and specific docs are allowed
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg", "image/png", "image/webp", 
    "application/pdf", "application/msword", 
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only Images and Docs are allowed."), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

module.exports = upload;