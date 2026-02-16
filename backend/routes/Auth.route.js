import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { verifyAuth, verifyLogin } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/login", verifyLogin, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      msg: "Invalid email or password",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      msg: "Invalid email or password",
    });
  }

  res.json({ user, msg: "user logged in successfully" });
});

router.post("/register", verifyAuth, async (req, res) => {
  const { userName, email, password, age, phoneNumber } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    age,
    email,
    phoneNumber,
    name: userName,
    password: hashedPassword,
  });

  await user.save();
 
  res.json({ user, msg: "user created successfully" });
});

export default router;
