const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getProfile,
  updateCourse,
  changePassword,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

router.get("/profile", protect, getProfile);
router.put("/update-course", protect, updateCourse);
router.put("/change-password", protect, changePassword);

module.exports = router;