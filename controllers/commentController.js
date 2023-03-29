const Comment = require("../models/Comment");
const Article = require("../models/Article");
const asyncHandler = require("express-async-handler");

//@desc get all comments
//@route GET /comments
//@access PUBLIC
const getAll = asyncHandler(async (req, res) => {
  const comments = await Comment.find({}).lean();
  if (!comments?.length) {
    return res.status(200).json({ message: "No comments to show !!" });
  }
  res.status(200).json(comments);
});

//@desc get  comment by Id
//@route GET /comments/:Id
//@access PUBLIC

const getCommentByArticleId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "No Article Id provided !!" });
  }
  const articleComments = await Comment.find({ articleId: id }).lean();
  if (!articleComments?.length) {
    return res
      .status(404)
      .json({ message: `No Comments found in Article : ${id} !!` });
  }
  return res
    .status(200)
    .json({ message: `Comments found in Article : ${id} !!`, articleComments });
});

//@desc add new  comment
//@route POST /comments
//@access PUBLIC

const createComment = asyncHandler(async (req, res) => {
  const { body } = req.body;
  const { id: articleId } = req.params;
  if (!articleId || !body) {
    return res.status(404).json({ message: "All fields are required" });
  }
  let newComment = {
    userId: req.user._id,
    articleId,
    body,
  };

  newComment = await Comment.create(newComment);
  res.status(201).json({ message: "Comment created successfully", newComment });
});

//@desc update a  comment
//@route PUT /comments/:id
//@access PUBLIC

const updateCommentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;

  if (!id) {
    return res.status(404).json({ message: "No Article Id provided !!" });
  }
  if (!body) {
    return res.status(404).json({ message: "No comment update provided !!" });
  }
  const existingComment = await Comment.findById(id).exec();
  if (!existingComment) {
    return res.status(404).json({ message: "Comment not found !!" });
  }
  console.log(existingComment.userId.toString(), "||", req.user._id.toString());
  if (existingComment.userId.toString() != req.user._id.toString()) {
    return res.status(401).json({ message: "Operations(s) not authorized !!" });
  }
  existingComment.body = body;
  const updatedComment = await existingComment.save();
  res.status(201).json({
    message: `Comment with Id : ${updatedComment._id} updated successfully`,
    updatedComment,
  });
});

//@desc delete a  comment
//@route DELETE /comments/:id
//@access PUBLIC

const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "No Article Id provided !!" });
  }
  const existingComment = await Comment.findById(id).exec();
  if (!existingComment) {
    return res.status(404).json({ message: "Comment not found !!" });
  }
  if (existingComment.userId.toString() != req.user._id.toString()) {
    return res.status(401).json({ message: "Operations(s) not authorized !!" });
  }
  const deletedComment = await existingComment.deleteOne();

  res.status(200).json({
    message: `Comment with Id : ${deletedComment._id} deleted successfully !!`,
    deletedComment,
  });
});
module.exports = {
  getAll,
  getCommentByArticleId,
  createComment,
  deleteComment,
  updateCommentById,
};
