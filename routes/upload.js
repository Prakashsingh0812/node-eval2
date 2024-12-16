const express = require("express");

const router = express.Router();

const {uploadFile,getUploadProgress} = require("../controllers/uploads");

router.post("/api/upload", uploadFile);
router.get("/api/upload/progress", getUploadProgress);

module.exports = router