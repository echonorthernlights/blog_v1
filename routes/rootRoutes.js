const express = require("express");
const router = express.Router();
const { upload } = require("../utils/fileUpload");

router.route("/").post("/upload", upload);
module.exports = router;
