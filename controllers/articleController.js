const Article = require("../models/Article");
const asyncHandler = require("express-async-handler");
var slugify = require("slugify");

// @desc get all articles
// @route GET /articles
// @access Public

const getAll = asyncHandler(async (req, res) => {
  const articles = await Article.find({}).lean();
  if (!articles?.length) {
    return res.status(404).json({ message: "No articles found" });
  }
  res.status(200).json(articles);
});

// @desc get articles by Id
// @route GET /articles/:id
// @access Public

//need a general search function filter//

const getArticleById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "No Id provided" });
  }
  const article = await Article.findById(id).lean();
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }
  res.status(200).json(article);
});

// @desc create new article
// @route POST /articles/
// @access Public

const createArticle = asyncHandler(async (req, res) => {
  const { title, text, images } = req.body;
  const { _id: userId } = req.user;
  const newArticle = {
    userId,
    title,
    slug: slugify(title.toLowerCase()),
    text,
    images,
  };
  const createdArticle = await Article.create(newArticle);
  res
    .status(201)
    .json({ message: "Article created succesfully", createdArticle });
});

// @desc update articles by Id
// @route PUT /articles/:id
// @access Public

const updateArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, text, images } = req.body;
  if (!id) {
    return res.status(404).json({ message: "No Id provided" });
  }
  const existingAticle = await Article.findById(id).exec();
  if (!existingAticle) {
    return res.status(404).json({ message: "Article not found" });
  }
  if (title) {
    existingAticle.title = title;
    existingAticle.slug = slugify(title.toLowerCase());
  }
  if (text) existingAticle.text = text;
  //if(images) existingAticle.images = images;

  const updatedArticle = await existingAticle.save();
  res
    .status(200)
    .json({ message: "Article updated succesfully", updatedArticle });
});

// @desc delete articles by Id
// @route DELETE /articles/:id
// @access Public

const deleteArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "No Id provided" });
  }
  const existingArticle = await Article.findById(id).exec();
  if (!existingArticle) {
    return res.status(404).json({ message: "Article not found" });
  }

  if (existingArticle.userId.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Operations(s) not authorized!!" });
  }
  const deletedArticle = await existingArticle.deleteOne();
  res
    .status(200)
    .json({ message: "Article deleted successfully", deletedArticle });
});
module.exports = {
  getAll,
  getArticleById,
  updateArticle,
  createArticle,
  deleteArticle,
};
