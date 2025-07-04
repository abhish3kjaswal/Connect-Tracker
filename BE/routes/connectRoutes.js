const express = require("express");
const router = express.Router();
const Connect = require("../models/connect");
const protect = require("../middleware/authMiddleware");
const buildConnectQuery = require("../utils/queryBuilder");
const isAdmin = require("../middleware/adminMiddleware");

function paginate(query, page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  return query.skip(skip).limit(limit);
}

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

//get all public connects with pagination and filter
router.get("/connects/public", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const query = buildConnectQuery({ ...req.query, isPrivate: "false" });

    const total = await Connect.countDocuments(query);

    // pagination
    const connects = await paginate(
      Connect.find(query).populate("user", "name username"),
      page,
      limit
    );

    // with query for filter
    // const connects = await Connect.find(query).populate(
    //   "user",
    //   "name username"
    // );

    res.status(200).json({
      connects,
      page,
      totalPages: Math.ceil(total / limit),
      totalResults: total,
    });

    // const publicConnects = await Connect.find({ isPrivate: false }).populate(
    //   "user",
    //   "name username"
    // );
    // res.status(200).json(publicConnects);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching public connects", error: err.message });
  }
});

// get all connects specific to user with pagination and filter
router.get("/connects/my", protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const query = buildConnectQuery(req.query, req.user.id);

    const total = await Connect.countDocuments(query);

    const connects = await paginate(Connect.find(query), page, limit);

    res.status(200).json({
      connects,
      page,
      totalPages: Math.ceil(total / limit),
      totalResults: total,
    });

    // const connects = await Connect.find(query);

    // const connects = await Connect.find({ user: req.user.id });
    // res.status(200).json(connects);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user connects", error: err.message });
  }
});

// get only private connects with pagination and filter
router.get("/connects/my/private", protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const query = buildConnectQuery(req.query, req.user.id, true);

    const total = await Connect.countDocuments(query);
    const privateConnects = await paginate(Connect.find(query), page, limit);

    res.status(200).json({
      privateConnects,
      page,
      totalPages: Math.ceil(total / limit),
      totalResults: total,
    });

    // query
    // const privateConnects = await Connect.find(query);

    // const privateConnects = await Connect.find({
    //   user: req.user.id,
    //   isPrivate: true,
    // });

    // res.status(200).json(privateConnects);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching private connects", error: err.message });
  }
});

// get allConnects for Admin
router.get("/admin/connects", protect, isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const totalResults = await Connect.countDocuments();

    const connects = await paginate(
      Connect.find().populate("user", "name username"),
      page,
      limit
    );

    res.status(200).json({
      connects,
      page,
      totalPages: Math.ceil(totalResults / limit),
      totalResults,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error Fetching connects", error: err.message });
  }
});

// delete connect as Admin
router.delete("/admin/connects/:id", protect, isAdmin, async (req, res) => {
  try {
    const connect = await Connect.findById(req.params.id);
    if (!connect) return res.status(404).json({ message: "Connect not found" });

    await connect.remove();

    res.status(200).json({ message: "Connect deleted by admin" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting connect", error: err.message });
  }
});

// Update connect

router.put("/connect/:id", protect, async (req, res) => {
  try {
    const connect = await Connect.findById(req.params.id);
    if (!connect) {
      return res.status(404).json({ message: "Connect not found" });
    }

    if (connect.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this connect" });
    }

    // update fields
    const updatableFields = [
      "name",
      "phone",
      "email",
      "company",
      "city",
      "jobProfile",
      "isPrivate",
      "description",
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        connect[field] = req.body[field];
      }
    });

    const updatedConnect = await connect.save();

    res.status(200).json(updatedConnect);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating connect", error: err.message });
  }
});

module.exports = router;
