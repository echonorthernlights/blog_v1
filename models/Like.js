const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
  },
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
