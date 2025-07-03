const express = require("express");
const router = express.Router();
const Connect = require("../models/connect");
const protect = require("../middleware/authMiddleware");

// Add a connect - post
router.post("/connects", protect, async (req, res) => {
  const {
    name,
    phone,
    email,
    company,
    city,
    jobProfile,
    isPrivate,
    description,
  } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Connect name is required" });
  }

  try {
    const connect = new Connect({
      user: req.user.id,
      name,
      phone,
      email,
      company,
      city,
      jobProfile,
      isPrivate,
      description,
    });

    const savedConnect = await connect.save();
    res.status(201).json(savedConnect);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error saving connect", error: err.message });
  }
});

// Delete

router.delete("/connects/:id", protect, async (req, res) => {
  try {
    const connect = await Connect.findById(req.params.id);

    if (!connect) {
      return res.status(404).json({ message: "Connect not found" });
    }

    // only the user who added connect should only remove it
    if (connect.user.toString() != req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await connect.remove();

    res.status(200).json({ message: "Connect removed" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting connect", error: err.message });
  }
});

//get all public connects

router.get("/connects/public", async (req, res) => {
  try {
    const publicConnects = await Connect.find({ isPrivate: false }).populate(
      "user",
      "name username"
    );
    res.status(200).json(publicConnects);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching public connects", error: err.message });
  }
});

// get all connects specific to user
router.get("/connects/my", protect, async (req, res) => {
  try {
    const connects = await Connect.find({ user: req.user.id });
    res.status(200).json(connects);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user connects", error: err.message });
  }
});

// get only private connects
router.get("/connects/my/private", protect, async (req, res) => {
  try {

    const privateConnects = await Connect.find({
      user: req.user.id,
      isPrivate: true,
    });

    res.status(200).json(privateConnects);

  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching private connects", error: err.message });
  }
});

module.exports = router;
