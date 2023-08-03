const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// Import task routes
const taskRoutes = require("./routes/tasks");

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Start the server
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// All routes
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to the task manager api.",
    baseURI: "http://localhost:5000/api",
    tasksURI: "http://localhost:5000/api/tasks",
  });
});

// Use task routes
app.use("/api", taskRoutes);

module.exports = app;
