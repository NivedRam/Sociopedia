import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import User from "../models/User.js";

//------------------REGISTER USER_----------

export const register = async (req, res) => {
  console.log("ss",req.body)
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    console.log(passwordHash);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath:req.file.filename,
      friends,
      location,
      occupation,
      viewdProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });
    const savedUser = await newUser.save();
    console.log("user");
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//--------------------------LOG IN---------------------

export const login = async (req, res) => {
  try {
    console.log(req.body)
    const { email, password } = req.body;
    console.log(email)
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({success:false, msg: "user does not exists" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({success:false, ms: "invalid credentials" });

    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete User.password;
    res.status(200).json({success:true, token, user });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
