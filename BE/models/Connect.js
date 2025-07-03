const mongoose = require("mongoose");

const connectSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: {
      type: String,
      required: true,
    },
    phone: { type: String },
    email: { type: String },
    company: { type: String },
    city: { type: String },
    jobProfile: { type: String },
    isPrivate: { type: Boolean, default: true },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Connect',connectSchema);