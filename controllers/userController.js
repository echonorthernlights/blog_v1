const User = require("../models/User");
const asyncHandler = require("express-async-handler");

//@desc register new user
//@route POST /register
//@access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, birthDate, address, password } = req.body;
  // check data is valid
  if (
    !firstName ||
    !lastName ||
    !email ||
    !birthDate ||
    !address ||
    !password
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // check duplicated email
  const duplicate = await User.findOne({ email }).select("-password");
  if (duplicate) {
    return res
      .status(400)
      .json({ message: "User email exists already, try a new one" });
  }
  let newUser = { firstName, lastName, email, address, birthDate, password };
  newUser = await User.create(newUser);
  res.status(201).json({ message: "User created successfully", newUser });
});

//@desc get all users
//@route GET /users
//@access PUBLIC

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(404).json({ message: "Users list is empty" });
  }
  return res.status(200).json(users);
});

//@desc get user by Id
//@route GET /users/:id
//@access PUBLIC

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "No Id provided" });
  }
  const user = await User.findById(id).select("-password").lean();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json(user);
});

//@desc UPDATE user by Id
//@route PUT /users/:id
//@access PUBLIC

const updateUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "No Id provided" });
  }

  const { firstName, lastName, email, birthDate, address, password } = req.body;

  const user = await User.findById(id).select("-password").exec();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const duplicate = await User.findOne({ email }).select("-password").lean();
  if (duplicate && duplicate._id.toString() !== id) {
    return res
      .status(400)
      .json({ message: "User email exists already, try with a new one" });
  }


  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (email) user.email = email;
  if (birthDate) user.birthDate = birthDate;
  if (address) user.address = address;
  if (password) user.password = password;

  const updatedUser = await user.save();

  return res
    .status(201)
    .json({ message: "User updated successfully", updatedUser });
});

//@desc DELETE user by Id
//@route DELETE /users/:id
//@access PUBLIC
const deleteUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "No Id provided" });
  }
  const user = await User.findById(id).select("-password").exec();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const deletedUser = await user.deleteOne();
  return res
    .status(200)
    .json({ message: "User deleted successfully", deletedUser });
});

module.exports = {
  registerUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
