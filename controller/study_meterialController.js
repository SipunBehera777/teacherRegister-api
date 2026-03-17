const Material = require("../model/studyMaterialModel");
const cloudinary = require("../Config/cloudinary");




exports.uploadMaterial = (req, res) => {
    // Check if file exists
    if (!req.file) return res.status(400).json({ success: false, message: "File required" });

    const {
        title, teacher_id, college_id, department_id,
        batch_id, section_id, semester_id, subject_id
    } = req.body;

    // 1. Authorization Check
    Material.checkAssignment(teacher_id, subject_id, section_id, batch_id, (err, assignments) => {
        if (err || assignments.length === 0) {
            // Clean up Cloudinary if unauthorized
            cloudinary.uploader.destroy(req.file.filename, { resource_type: req.file.resource_type });
            
            return res.status(403).json({ 
                success: false, 
                message: "Unauthorized: You are not assigned to this class." 
            });
        }

        // 2. Data for DB (Using req.file properties)
        const data = {
            title,
            file_url: req.file.path,
            public_id: req.file.filename, 
            resource_type: req.file.resource_type, // "image" or "raw"
            teacher_id, college_id, department_id, batch_id, section_id, semester_id, subject_id
        };

        // 3. Save to Database
        Material.addMaterial(data, (dbErr) => {
            if (dbErr) {
                cloudinary.uploader.destroy(req.file.filename, { resource_type: req.file.resource_type });
                return res.status(500).json({ success: false, message: "Database Save Error" });
            }
            res.json({ success: true, message: "Material uploaded successfully" });
        });
    });
};

// ... deleteMaterial and getMaterials remain the same as previous correct version
exports.deleteMaterial = (req, res) => {
  const { id } = req.params;

  Material.getById(id, async (err, result) => {
    if (err || result.length === 0) return res.json({ success: false, message: "File not found" });

    const file = result[0];

    try {
      // Use the stored resource_type for Cloudinary deletion
      await cloudinary.uploader.destroy(file.public_id, { resource_type: file.resource_type });

      Material.deleteMaterial(id, (dbErr) => {
        if (dbErr) return res.json({ success: false, message: "Failed to delete from DB" });
        res.json({ success: true, message: "Deleted successfully" });
      });
    } catch (e) {
      res.json({ success: false, message: "Cloudinary error" });
    }
  });
};

exports.getMaterials = (req, res) => {
  Material.getMaterials(req.query, (err, result) => {
    if (err) return res.json({ success: false });
    res.json({ success: true, data: result });
  });
};