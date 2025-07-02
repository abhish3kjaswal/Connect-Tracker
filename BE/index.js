const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//load env vars
dotenv.config();

// DB connection
connectDB();

// app instance
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// start server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
