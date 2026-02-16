import { User } from "../models/user.model.js";

export const verifyAuth = async (req, res, next) => {
  const { userName, email, password, age, phoneNumber } = req.body;

  if (!userName || !email || !password || !age || !phoneNumber) {
    res.json({ msg: "fill all mandatory details" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      msg: "Email already registered",
    });
  }

  next();
};

export const verifyLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) res.json({ msg: "fill all details" });

  next();
};
