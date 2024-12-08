import User from "../models/User.js";
import bcrypt from "bcrypt";

export const creatUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, hashedPassword });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;

    try{
        const user = await User.findBypk(id);

        if (!user) {
            return req.status(404).json({ message: "User not found " });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};