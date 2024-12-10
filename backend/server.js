import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import db from './src/config/database.js';
import authRoutes from "./src/routes/authRoutes.js";
import routes from './src/routes/index.js'; // Renamed router to routes
import { connectDB } from './src/config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json()); // Parse incoming JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(passport.initialize());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Spear Wallet");
});
app.use("/api", routes); 
app.use("/api/auth", authRoutes); // Define auth routes

// Database connection
db.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch((err) => console.error('Database connection error:', err));

// Start the server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running at http://localhost:${PORT}`);
});