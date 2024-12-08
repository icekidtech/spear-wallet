import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import authRoutes from "./src/routes/authRoutes.js";
import routes from './src/routes/index.js'; // Renamed router to routes
import { connectDB } from './src/config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(passport.initialize());

// API Routes
app.get("/", (req, res) => {
    res.send("Welcome to Spear Wallet API!");
  });
  
app.use("/api", routes); // Now using the correctly imported routes
app.use("/api/auth", authRoutes);

// Start the server
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running at http://localhost:${PORT}`);
});
