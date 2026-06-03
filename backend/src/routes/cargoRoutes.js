const express = require("express");

const router = express.Router();

const authenticateUser = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

const { uploadManifest, getCargo } = require("../controllers/cargoController");

router.post(
  "/upload",
  authenticateUser,
  authorizeAdmin,
  upload.single("manifest"),
  uploadManifest
);
router.get("/cargo", authenticateUser, getCargo);

module.exports = router;
