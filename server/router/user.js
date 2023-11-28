import express from "express";
const router = express.Router();
import {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserByID,
  deleteUser,
  updateUser,
} from "../controllers/user.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.post("/register", registerUser);

router.post("/login", authUser);

router.get("/logout", logoutUser);

router.get("/profile", protect, getUserProfile);

router.put("/update", protect, updateUserProfile);

router.get("/get_all_users", protect, admin, getUsers);

router.get("/get_user_by_id", protect, admin, getUserByID);

router.delete("/delete_user", protect, admin, deleteUser);

router.put("/update_user", protect, admin, updateUser);

export default router;
