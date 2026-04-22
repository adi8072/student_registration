const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await Student.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: student._id,
      name: student.name,
      email: student.email,
      token: generateToken(student._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });

    if (student && (await bcrypt.compare(password, student.password))) {
      res.json({
        _id: student._id,
        name: student.name,
        email: student.email,
        course: student.course,
        token: generateToken(student._id),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE COURSE
exports.updateCourse = async (req, res) => {
  try {
    const { course } = req.body;

    const student = await Student.findById(req.user.id);

    if (student) {
      student.course = course || student.course;
      await student.save();
      res.json({ message: "Course updated", course: student.course });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CHANGE PASSWORD
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, student.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    student.password = await bcrypt.hash(newPassword, 10);
    await student.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};