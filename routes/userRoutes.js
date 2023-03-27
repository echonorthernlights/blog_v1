const express = require("express");
const router = express.Router();

const {
  authUser,
  registerUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");

const { protect } = require("../middleware/auth");

router.route("/login").post(authUser);
router.route("/").get(getUsers).post(registerUser);
router
  .route("/:id")
  .get(protect, getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

module.exports = router;
