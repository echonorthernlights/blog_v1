const express = require("express");
const { like } = require("../controllers/likeController");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.route("/:articleId").post(protect, like);
module.exports = router;
