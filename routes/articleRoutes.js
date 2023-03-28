const express = require("express");
const {
  getAll,
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.route("/").get(getAll).post(protect, createArticle);
router
  .route("/:id")
  .get(protect, getArticleById)
  .put(protect, updateArticle)
  .delete(protect, deleteArticle);

module.exports = router;
