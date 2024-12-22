import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";

// create user
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email already in use");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }

  res.status(400);
  throw new Error("Invalid credentials");
});

// login user
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }

  res.status(401);
  throw new Error("Invalid credentials");
});

// logout
export const logoutUser = asyncHandler(async (req, res) => {
  res
    .clearCookie("jwt")
    .status(200)
    .json({ message: "Logged out successfully" });
});

// get user profile by id
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  // send user as response
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }

  res.status(404);
  throw new Error("User not found");
});

// update user profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    // update name and password
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // update password
    if (req.body.password) {
      user.password = req.body.password;
    }

    // save updated password
    const updatedUser = await user.save();

    // send updated user as response
    return res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  }

  res.status(404);
  throw new Error("User not found");
});

// get all users
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// get user by id
export const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.id).select("-password");
  if (user) {
    return res.status(200).json(user);
  }

  res.status(404);
  throw new Error("User not found");
});

// delete user
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can not delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    return res.status(200).json({ message: "User deleted successfully" });
  }

  res.status(404);
  throw new Error("User is not found");
});

// update user
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      message: "User updated successfully",
    });
  }

  res.status(404);
  throw new Error("User not found");
});
