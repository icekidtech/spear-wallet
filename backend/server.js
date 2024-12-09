import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import bodyParser from 'body-parser';
import db from './src/config/database.js'; // Import your database connection
import authRoutes from "./src/routes/authRoutes.js";
import routes from './src/routes/index.js'; // Renamed router to routes
import { connectDB } from './src/config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Routes
app.use('/api/auth', authRoutes);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.get("/", (req, res) => {
    res.send("Welcome to Spear Wallet");
  });
  
app.use("/api", routes); // Now using the correctly imported routes
app.use("/api/auth", authRoutes);

// Connect to the database
db.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch((err) => console.error('Database connection error:', err));

// Start the server
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running at http://localhost:${PORT}`);
});
