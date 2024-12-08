import express from "express";
import { creatUser, getUserById } from "../controllers/userController.js";

const router = express.Router();

router.post("/", creatUser);
router.get("/", getUserById);

export default router;