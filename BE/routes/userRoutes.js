const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const protect = require("../middleware/authMiddleware");
const rateLimit = require("express-rate-limit");

// login limitter - to prevent abuse and rate of login into the system
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 100, //10mins
  max: 5,
  message: "Too many login attempts, Please try again later in 10mins",
});

// register user
router.post("/register", async (req, res) => {
  const { name, phone, email, username, password } = req.body;

  if (!name || !phone || !email || !username || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or user already exists" });
    }

    // hash password

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      phone,
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User Registered Successfully!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

// login user
router.post("/login", loginLimiter, async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username and password" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    res.status(200).json({
      message: "login successfull",
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// get all users
router.get("/allUsers", protect, async (req, res) => {
  try {
    const users = await User.find({}, "-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// get user by username

router.get("/users/:username", protect, async (req, res) => {
  try {
    const user = await User.findOne(
      { username: req.params.username },
      "-password"
    );
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
