import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const validUser = await User.findOne({ username }).exec();

    if (!validUser) {
      return res.status(401).json({ message: "User not found!" });
    }

    const validPassword = await bcrypt.compare(password, validUser.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: validUser._id,
          username: validUser.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "120m" }
    );

    // Create secure cookie with refresh token
    res.cookie("jwt", accessToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None", //cross-site cookie
      maxAge: 120 * 60 * 1000, //cookie expiry: set to match access token
    });

    // Send username
    res.json({
      accessToken,
      userInfo: {
        username: validUser.username,
        email: validUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.json({ message: "User logged out!" });
  } catch (error) {
    next(error);
  }
};
