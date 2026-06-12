require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const { connectDB } = require("./src/utils/connectDB");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

const { initSocket } = require("./src/utils/socket");

const app = express();
const server = http.createServer(app);
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost",
  process.env.CORS_ORIGIN,
];

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// Store io instance
app.set("io", io);

// Initialise socket listeners
initSocket(io);

// Middleware
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Task Management API is running...");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
};

startServer();
