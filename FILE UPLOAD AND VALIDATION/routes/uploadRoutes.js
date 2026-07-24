const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.url.includes("avatar")) {
      cb(null, "uploads/avatars");
    } else {
      cb(null, "uploads/posts");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// File filter (AI-generated + modified)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

// Avatar upload (1MB limit)
const uploadAvatar = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png/;
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowed.test(ext)) cb(null, true);
    else cb(new Error("Only JPG and PNG allowed"));
  }
});

// Post image upload
const uploadPost = multer({
  storage,
  fileFilter
});

// Routes

// Upload avatar
router.post("/upload-avatar", uploadAvatar.single("avatar"), (req, res) => {
  res.json({
    message: "Avatar uploaded",
    file: req.file.filename
  });
});

// Upload post image
router.post("/upload-post-image", uploadPost.single("image"), (req, res) => {
  res.json({
    filename: req.file.filename,
    size: req.file.size
  });
});

module.exports = router;
