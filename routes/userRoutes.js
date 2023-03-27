const express = require("express");
const router = express.Router();

const {
  registerUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");

router.route("/").get(getUsers).post(registerUser);
router
  .route("/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

module.exports = router;
