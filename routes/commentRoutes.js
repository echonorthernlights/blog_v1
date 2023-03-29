const express = require("express");
const {
  getAll,
  createComment,
  getCommentByArticleId,
  deleteComment,
  updateCommentById,
} = require("../controllers/commentController");
const router = express.Router();

const { protect } = require("../middleware/auth");

router.route("/").get(getAll);
router
  .route("/:id")
  .get(protect, getCommentByArticleId)
  .post(protect, createComment)
  .put(protect, updateCommentById)
  .delete(protect, deleteComment);

module.exports = router;
