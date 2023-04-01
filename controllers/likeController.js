const Like = require("../models/Like");
const asyncHandler = require("express-async-handler");

//@desc add/remove like from article
//@route POST articles/:id
//@access PUBLIC
const like = asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  const { _id: userId } = req.user;
  if (!articleId || !userId) {
    return res
      .status(400)
      .json({ message: "No Article or User Id provided !!" });
  }
  const likeExists = await Like.findOne({ articleId, userId }).exec();
  if (!likeExists) {
    let newLike = {
      userId,
      articleId,
    };
    newLike = await Like.create(newLike);
    return res.status(200).json({ message: "Like added", newLike });
  } else {
    let unlike = await likeExists.deleteOne();
    return res.status(200).json({ message: "Like removed", unlike });
  }
});

module.exports = { like };
